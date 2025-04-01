
/**
 * User Controller
 * 
 * Business logic for user-related API endpoints.
 */
const UserService = require('../../services/userService');
const apiResponse = require('../../utils/apiResponse');
const logger = require('../../utils/logger');

const userService = new UserService();

/**
 * Get users with pagination and filtering
 */
const getUsers = async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      school: req.query.school,
      skill: req.query.skill,
      level: req.query.level
    };
    
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-createdAt'
    };
    
    const users = await userService.getUsers(filters, options);
    
    return apiResponse.success(res, 200, 'Users retrieved successfully', users);
  } catch (error) {
    logger.error(`Error retrieving users: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to retrieve users');
  }
};

/**
 * Get user by ID
 */
const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    
    if (!user) {
      return apiResponse.error(res, 404, 'User not found');
    }
    
    return apiResponse.success(res, 200, 'User retrieved successfully', user);
  } catch (error) {
    logger.error(`Error retrieving user: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to retrieve user');
  }
};

/**
 * Update user
 */
const updateUser = async (req, res) => {
  try {
    // Check if user is updating their own profile or is an admin
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return apiResponse.error(res, 403, 'Not authorized to update this user');
    }
    
    const user = await userService.updateUser(req.params.id, req.body);
    
    if (!user) {
      return apiResponse.error(res, 404, 'User not found');
    }
    
    return apiResponse.success(res, 200, 'User updated successfully', user);
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to update user');
  }
};

/**
 * Follow user
 */
const followUser = async (req, res) => {
  try {
    const result = await userService.followUser(req.user.id, req.params.id);
    
    if (!result) {
      return apiResponse.error(res, 400, 'Failed to follow user');
    }
    
    // Send notification to followed user via WebSocket
    const io = req.app.get('io');
    io.to(`user:${req.params.id}`).emit('notifications:new', {
      type: 'follow',
      user: {
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar
      },
      message: `${req.user.name} started following you`,
      createdAt: new Date()
    });
    
    return apiResponse.success(res, 200, 'User followed successfully');
  } catch (error) {
    logger.error(`Error following user: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to follow user');
  }
};

/**
 * Unfollow user
 */
const unfollowUser = async (req, res) => {
  try {
    const result = await userService.unfollowUser(req.user.id, req.params.id);
    
    if (!result) {
      return apiResponse.error(res, 400, 'Failed to unfollow user');
    }
    
    return apiResponse.success(res, 200, 'User unfollowed successfully');
  } catch (error) {
    logger.error(`Error unfollowing user: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to unfollow user');
  }
};

/**
 * Get user followers
 */
const getFollowers = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10
    };
    
    const followers = await userService.getFollowers(req.params.id, options);
    
    return apiResponse.success(res, 200, 'Followers retrieved successfully', followers);
  } catch (error) {
    logger.error(`Error retrieving followers: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to retrieve followers');
  }
};

/**
 * Get users being followed
 */
const getFollowing = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10
    };
    
    const following = await userService.getFollowing(req.params.id, options);
    
    return apiResponse.success(res, 200, 'Following retrieved successfully', following);
  } catch (error) {
    logger.error(`Error retrieving following: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to retrieve following');
  }
};

/**
 * Add skill to user
 */
const addSkill = async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return apiResponse.error(res, 403, 'Not authorized to update this user');
    }
    
    const skill = await userService.addSkill(req.params.id, req.body);
    
    if (!skill) {
      return apiResponse.error(res, 400, 'Failed to add skill');
    }
    
    return apiResponse.success(res, 200, 'Skill added successfully', skill);
  } catch (error) {
    logger.error(`Error adding skill: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to add skill');
  }
};

/**
 * Endorse user skill
 */
const endorseSkill = async (req, res) => {
  try {
    const result = await userService.endorseSkill(
      req.params.id,
      req.params.skillId,
      req.user.id
    );
    
    if (!result) {
      return apiResponse.error(res, 400, 'Failed to endorse skill');
    }
    
    // Send notification to endorsed user via WebSocket
    const io = req.app.get('io');
    io.to(`user:${req.params.id}`).emit('notifications:new', {
      type: 'endorsement',
      user: {
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar
      },
      skill: result.skillName,
      message: `${req.user.name} endorsed your ${result.skillName} skill`,
      createdAt: new Date()
    });
    
    return apiResponse.success(res, 200, 'Skill endorsed successfully');
  } catch (error) {
    logger.error(`Error endorsing skill: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to endorse skill');
  }
};

/**
 * Get user projects
 */
const getUserProjects = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-createdAt'
    };
    
    const projects = await userService.getUserProjects(req.params.id, options);
    
    return apiResponse.success(res, 200, 'User projects retrieved successfully', projects);
  } catch (error) {
    logger.error(`Error retrieving user projects: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to retrieve user projects');
  }
};

/**
 * Get user ideas
 */
const getUserIdeas = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-createdAt'
    };
    
    const ideas = await userService.getUserIdeas(req.params.id, options);
    
    return apiResponse.success(res, 200, 'User ideas retrieved successfully', ideas);
  } catch (error) {
    logger.error(`Error retrieving user ideas: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to retrieve user ideas');
  }
};

/**
 * Get user XP history
 */
const getXpHistory = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 20,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };
    
    const xpHistory = await userService.getXpHistory(req.params.id, options);
    
    return apiResponse.success(res, 200, 'XP history retrieved successfully', xpHistory);
  } catch (error) {
    logger.error(`Error retrieving XP history: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to retrieve XP history');
  }
};

/**
 * Award XP to user
 */
const awardXp = async (req, res) => {
  try {
    // Only admins and system can award XP
    if (req.user.role !== 'admin' && req.user.role !== 'system') {
      return apiResponse.error(res, 403, 'Not authorized to award XP');
    }
    
    const { amount, reason, sourceType, sourceId } = req.body;
    
    const result = await userService.awardXp(
      req.params.id,
      amount,
      reason,
      sourceType,
      sourceId
    );
    
    if (!result) {
      return apiResponse.error(res, 400, 'Failed to award XP');
    }
    
    // Send notification to user via WebSocket
    const io = req.app.get('io');
    io.to(`user:${req.params.id}`).emit('notifications:new', {
      type: 'xp',
      amount,
      reason,
      message: `You earned ${amount} XP for ${reason}`,
      createdAt: new Date()
    });
    
    return apiResponse.success(res, 200, 'XP awarded successfully', {
      amount,
      newTotal: result.newTotal,
      levelUp: result.levelUp
    });
  } catch (error) {
    logger.error(`Error awarding XP: ${error.message}`);
    return apiResponse.error(res, 500, 'Failed to award XP');
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  addSkill,
  endorseSkill,
  getUserProjects,
  getUserIdeas,
  getXpHistory,
  awardXp
};
