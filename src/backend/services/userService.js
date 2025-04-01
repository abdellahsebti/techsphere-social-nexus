
/**
 * User Service
 * 
 * Business logic for user-related operations.
 */
const User = require('../models/user.model');
const Skill = require('../models/skill.model');
const Project = require('../models/project.model');
const Idea = require('../models/idea.model');
const XpTransaction = require('../models/xpTransaction.model');
const paginate = require('../utils/paginator');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

class UserService {
  /**
   * Get users with filtering and pagination
   */
  async getUsers(filters = {}, options = {}) {
    const query = {};
    
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { username: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    if (filters.school) {
      query.school = { $regex: filters.school, $options: 'i' };
    }
    
    if (filters.skill) {
      query['skills.name'] = { $regex: filters.skill, $options: 'i' };
    }
    
    if (filters.level) {
      query.level = filters.level;
    }
    
    return paginate(
      User,
      query,
      {
        ...options,
        select: '-password -tokens',
        populate: options.populate || ''
      }
    );
  }
  
  /**
   * Get user by ID
   */
  async getUserById(userId) {
    return User.findById(userId)
      .select('-password -tokens')
      .populate('skills.endorsements', 'name avatar');
  }
  
  /**
   * Update user
   */
  async updateUser(userId, updateData) {
    return User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -tokens');
  }
  
  /**
   * Follow user
   */
  async followUser(followerId, targetId) {
    // Check if users exist
    const [follower, target] = await Promise.all([
      User.findById(followerId),
      User.findById(targetId)
    ]);
    
    if (!follower || !target) {
      return null;
    }
    
    // Check if already following
    if (follower.following.includes(targetId)) {
      return { alreadyFollowing: true };
    }
    
    // Update both users
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Add target to follower's following list
      await User.findByIdAndUpdate(
        followerId,
        { $addToSet: { following: targetId } },
        { session }
      );
      
      // Add follower to target's followers list
      await User.findByIdAndUpdate(
        targetId,
        { $addToSet: { followers: followerId } },
        { session }
      );
      
      await session.commitTransaction();
      session.endSession();
      
      return { success: true };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`Error in followUser: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Unfollow user
   */
  async unfollowUser(followerId, targetId) {
    // Update both users
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Remove target from follower's following list
      await User.findByIdAndUpdate(
        followerId,
        { $pull: { following: targetId } },
        { session }
      );
      
      // Remove follower from target's followers list
      await User.findByIdAndUpdate(
        targetId,
        { $pull: { followers: followerId } },
        { session }
      );
      
      await session.commitTransaction();
      session.endSession();
      
      return { success: true };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`Error in unfollowUser: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get user followers
   */
  async getFollowers(userId, options = {}) {
    const user = await User.findById(userId).select('followers');
    
    if (!user) {
      return null;
    }
    
    return paginate(
      User,
      { _id: { $in: user.followers } },
      {
        ...options,
        select: 'name username avatar bio school level'
      }
    );
  }
  
  /**
   * Get users being followed
   */
  async getFollowing(userId, options = {}) {
    const user = await User.findById(userId).select('following');
    
    if (!user) {
      return null;
    }
    
    return paginate(
      User,
      { _id: { $in: user.following } },
      {
        ...options,
        select: 'name username avatar bio school level'
      }
    );
  }
  
  /**
   * Add skill to user
   */
  async addSkill(userId, skillData) {
    const user = await User.findById(userId);
    
    if (!user) {
      return null;
    }
    
    let skillId;
    
    // If skill is a string (existing skill ID)
    if (typeof skillData.skill === 'string') {
      skillId = skillData.skill;
      
      // Verify skill exists
      const skillExists = await Skill.findById(skillId);
      if (!skillExists) {
        throw new Error('Skill not found');
      }
    } else {
      // Create new skill or find existing one
      const { name, category } = skillData.skill;
      
      let skill = await Skill.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        category: { $regex: new RegExp(`^${category}$`, 'i') }
      });
      
      if (!skill) {
        skill = await Skill.create({
          name,
          category,
          popularityScore: 1
        });
      } else {
        // Increment popularity score
        await Skill.findByIdAndUpdate(
          skill._id,
          { $inc: { popularityScore: 1 } }
        );
      }
      
      skillId = skill._id;
    }
    
    // Check if user already has this skill
    const existingSkill = user.skills.find(
      s => s.skillId.toString() === skillId.toString()
    );
    
    if (existingSkill) {
      // Update existing skill level
      await User.findOneAndUpdate(
        { _id: userId, 'skills.skillId': skillId },
        { $set: { 'skills.$.level': skillData.level } }
      );
    } else {
      // Add new skill
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            skills: {
              skillId,
              level: skillData.level,
              endorsements: []
            }
          }
        }
      );
    }
    
    // Get updated user with populated skills
    const updatedUser = await User.findById(userId)
      .select('skills')
      .populate('skills.skillId', 'name category');
    
    return updatedUser.skills.find(
      s => s.skillId._id.toString() === skillId.toString()
    );
  }
  
  /**
   * Endorse user skill
   */
  async endorseSkill(userId, skillId, endorserId) {
    // Check if users are different
    if (userId === endorserId) {
      throw new Error('Cannot endorse your own skill');
    }
    
    const user = await User.findById(userId).populate('skills.skillId');
    
    if (!user) {
      return null;
    }
    
    // Find the skill in user's skills
    const skillIndex = user.skills.findIndex(
      s => s._id.toString() === skillId
    );
    
    if (skillIndex === -1) {
      throw new Error('Skill not found for this user');
    }
    
    const skill = user.skills[skillIndex];
    
    // Check if already endorsed
    if (skill.endorsements.includes(endorserId)) {
      return {
        alreadyEndorsed: true,
        skillName: skill.skillId.name
      };
    }
    
    // Add endorsement
    await User.findOneAndUpdate(
      { _id: userId, 'skills._id': skillId },
      { $addToSet: { 'skills.$.endorsements': endorserId } }
    );
    
    // Increment skill popularity
    await Skill.findByIdAndUpdate(
      skill.skillId._id,
      { $inc: { popularityScore: 1 } }
    );
    
    return {
      success: true,
      skillName: skill.skillId.name
    };
  }
  
  /**
   * Get user projects
   */
  async getUserProjects(userId, options = {}) {
    return paginate(
      Project,
      { 'author.id': userId },
      {
        ...options,
        populate: 'tags collaborators'
      }
    );
  }
  
  /**
   * Get user ideas
   */
  async getUserIdeas(userId, options = {}) {
    return paginate(
      Idea,
      { 'author.id': userId },
      {
        ...options,
        populate: 'tags'
      }
    );
  }
  
  /**
   * Get user XP history
   */
  async getXpHistory(userId, options = {}) {
    const query = { userId };
    
    if (options.startDate) {
      query.createdAt = { $gte: new Date(options.startDate) };
    }
    
    if (options.endDate) {
      query.createdAt = {
        ...query.createdAt,
        $lte: new Date(options.endDate)
      };
    }
    
    return paginate(
      XpTransaction,
      query,
      {
        page: options.page,
        limit: options.limit,
        sort: '-createdAt'
      }
    );
  }
  
  /**
   * Award XP to user
   */
  async awardXp(userId, amount, reason, sourceType, sourceId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Get current user
      const user = await User.findById(userId).session(session);
      
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return null;
      }
      
      // Calculate new XP total
      const oldXp = user.xp;
      const newXp = oldXp + amount;
      
      // Calculate level based on XP
      // Level = 1 + floor(sqrt(XP / 100))
      const oldLevel = user.level;
      const newLevel = Math.floor(1 + Math.sqrt(newXp / 100));
      const levelUp = newLevel > oldLevel;
      
      // Update user XP and level
      await User.findByIdAndUpdate(
        userId,
        {
          $set: { xp: newXp, level: newLevel }
        },
        { session }
      );
      
      // Create XP transaction record
      await XpTransaction.create(
        [{
          userId,
          amount,
          reason,
          sourceType,
          sourceId,
          oldTotal: oldXp,
          newTotal: newXp,
          levelUp
        }],
        { session }
      );
      
      await session.commitTransaction();
      session.endSession();
      
      return {
        oldTotal: oldXp,
        newTotal: newXp,
        levelUp,
        oldLevel,
        newLevel
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`Error in awardXp: ${error.message}`);
      throw error;
    }
  }
}

module.exports = UserService;
