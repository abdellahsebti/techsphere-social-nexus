
/**
 * Project Service
 * 
 * Business logic for project-related operations.
 */
const Project = require('../models/project.model');
const User = require('../models/user.model');
const XpTransaction = require('../models/xpTransaction.model');
const paginate = require('../utils/paginator');
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const fileUpload = require('../utils/fileUpload');

class ProjectService {
  /**
   * Get projects with filtering and pagination
   */
  async getProjects(filters = {}, options = {}) {
    const query = {};
    
    // Apply status filter (draft/published)
    if (filters.status) {
      query.status = filters.status;
    } else {
      // Default to only published projects for public access
      query.status = 'published';
    }
    
    // Apply tag filter
    if (filters.tag) {
      query.tags = { $in: [filters.tag] };
    }
    
    // Apply school filter
    if (filters.school) {
      query['author.school'] = { $regex: filters.school, $options: 'i' };
    }
    
    // Apply text search
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { content: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    return paginate(
      Project,
      query,
      {
        ...options,
        populate: options.populate || 'tags'
      }
    );
  }
  
  /**
   * Get project by ID
   */
  async getProjectById(projectId) {
    return Project.findById(projectId)
      .populate('tags')
      .populate('collaborators.id', 'name avatar');
  }
  
  /**
   * Create project
   */
  async createProject(projectData, userId) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Prepare author info
      const author = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        school: user.school
      };
      
      // Create project
      const project = await Project.create(
        [{
          ...projectData,
          author,
          status: projectData.status || 'published',
          visibility: projectData.visibility || 'public'
        }],
        { session }
      );
      
      // Award XP for creating a project
      await XpTransaction.create(
        [{
          userId,
          amount: 20, // XP amount for creating a project
          reason: 'Created a new project',
          sourceType: 'project',
          sourceId: project[0]._id,
          oldTotal: user.xp,
          newTotal: user.xp + 20
        }],
        { session }
      );
      
      // Update user XP
      await User.findByIdAndUpdate(
        userId,
        { $inc: { xp: 20 } },
        { session }
      );
      
      await session.commitTransaction();
      session.endSession();
      
      return project[0];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`Error in createProject: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Update project
   */
  async updateProject(projectId, updateData, userId) {
    const project = await Project.findById(projectId);
    
    if (!project) {
      return null;
    }
    
    // Check authorization (author or collaborator)
    const isAuthor = project.author.id.toString() === userId;
    const isCollaborator = project.collaborators.some(
      c => c.id.toString() === userId && c.role === 'editor'
    );
    
    if (!isAuthor && !isCollaborator) {
      throw new Error('Not authorized to update this project');
    }
    
    // Process any file attachments if included
    if (updateData.attachments && updateData.attachments.length > 0) {
      for (const attachment of updateData.attachments) {
        if (attachment.file && attachment.file.buffer) {
          const uploadResult = await fileUpload.uploadToS3(
            attachment.file.buffer,
            attachment.file.originalname,
            attachment.file.mimetype,
            'projects'
          );
          
          // Replace file object with upload result
          attachment.url = uploadResult.url;
          attachment.key = uploadResult.key;
          delete attachment.file;
        }
      }
    }
    
    return Project.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }
  
  /**
   * Delete project
   */
  async deleteProject(projectId, userId) {
    const project = await Project.findById(projectId);
    
    if (!project) {
      return null;
    }
    
    // Check authorization (only author can delete)
    if (project.author.id.toString() !== userId) {
      throw new Error('Not authorized to delete this project');
    }
    
    // Delete any S3 files associated with the project
    if (project.attachments && project.attachments.length > 0) {
      for (const attachment of project.attachments) {
        if (attachment.key) {
          await fileUpload.deleteFromS3(attachment.key);
        }
      }
    }
    
    return Project.findByIdAndDelete(projectId);
  }
  
  /**
   * Like project
   */
  async likeProject(projectId, userId) {
    const project = await Project.findById(projectId);
    
    if (!project) {
      return null;
    }
    
    // Check if already liked
    if (project.likes.includes(userId)) {
      return { alreadyLiked: true };
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Add like
      await Project.findByIdAndUpdate(
        projectId,
        { $addToSet: { likes: userId } },
        { session }
      );
      
      // Award XP to project author (if not self-like)
      if (project.author.id.toString() !== userId) {
        const author = await User.findById(project.author.id).session(session);
        
        if (author) {
          // Award XP for receiving a like
          await XpTransaction.create(
            [{
              userId: project.author.id,
              amount: 5, // XP amount for receiving a like
              reason: 'Received a like on project',
              sourceType: 'reaction',
              sourceId: projectId,
              oldTotal: author.xp,
              newTotal: author.xp + 5
            }],
            { session }
          );
          
          // Update user XP
          await User.findByIdAndUpdate(
            project.author.id,
            { $inc: { xp: 5 } },
            { session }
          );
        }
      }
      
      await session.commitTransaction();
      session.endSession();
      
      return { success: true };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`Error in likeProject: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Unlike project
   */
  async unlikeProject(projectId, userId) {
    return Project.findByIdAndUpdate(
      projectId,
      { $pull: { likes: userId } }
    );
  }
  
  /**
   * Add reaction to project
   */
  async addReaction(projectId, reactionData, userId) {
    const { type } = reactionData;
    const project = await Project.findById(projectId);
    
    if (!project) {
      return null;
    }
    
    // Find existing reaction of this type
    const existingReaction = project.reactions.find(r => r.type === type);
    
    // Check if user already reacted with this type
    if (existingReaction && existingReaction.users.includes(userId)) {
      return { alreadyReacted: true };
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Add reaction
      if (existingReaction) {
        // Add user to existing reaction
        await Project.findOneAndUpdate(
          { _id: projectId, 'reactions.type': type },
          { $addToSet: { 'reactions.$.users': userId } },
          { session }
        );
      } else {
        // Create new reaction type
        await Project.findByIdAndUpdate(
          projectId,
          {
            $push: {
              reactions: {
                type,
                users: [userId]
              }
            }
          },
          { session }
        );
      }
      
      // Award XP to project author (if not self-reaction)
      if (project.author.id.toString() !== userId) {
        const author = await User.findById(project.author.id).session(session);
        
        if (author) {
          // Different XP amounts based on reaction type
          let xpAmount = 5; // Default
          
          if (type === 'genius') xpAmount = 10;
          else if (type === 'game_changer') xpAmount = 15;
          
          // Award XP for receiving a reaction
          await XpTransaction.create(
            [{
              userId: project.author.id,
              amount: xpAmount,
              reason: `Received a "${type}" reaction on project`,
              sourceType: 'reaction',
              sourceId: projectId,
              oldTotal: author.xp,
              newTotal: author.xp + xpAmount
            }],
            { session }
          );
          
          // Update user XP
          await User.findByIdAndUpdate(
            project.author.id,
            { $inc: { xp: xpAmount } },
            { session }
          );
        }
      }
      
      await session.commitTransaction();
      session.endSession();
      
      return { success: true };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`Error in addReaction: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Remove reaction from project
   */
  async removeReaction(projectId, reactionType, userId) {
    return Project.findOneAndUpdate(
      { _id: projectId, 'reactions.type': reactionType },
      { $pull: { 'reactions.$.users': userId } }
    );
  }
  
  /**
   * Add comment to project
   */
  async addComment(projectId, commentData, userId) {
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);
    
    if (!user || !project) {
      return null;
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Create comment object
      const comment = {
        id: new mongoose.Types.ObjectId(),
        author: {
          id: user._id,
          name: user.name,
          avatar: user.avatar
        },
        content: commentData.content,
        createdAt: new Date()
      };
      
      // Add comment to project
      await Project.findByIdAndUpdate(
        projectId,
        { $push: { comments: comment } },
        { session }
      );
      
      // Award XP to project author (if not self-comment)
      if (project.author.id.toString() !== userId) {
        const author = await User.findById(project.author.id).session(session);
        
        if (author) {
          // Award XP for receiving a comment
          await XpTransaction.create(
            [{
              userId: project.author.id,
              amount: 5, // XP amount for receiving a comment
              reason: 'Received a comment on project',
              sourceType: 'comment',
              sourceId: projectId,
              oldTotal: author.xp,
              newTotal: author.xp + 5
            }],
            { session }
          );
          
          // Update user XP
          await User.findByIdAndUpdate(
            project.author.id,
            { $inc: { xp: 5 } },
            { session }
          );
        }
      }
      
      await session.commitTransaction();
      session.endSession();
      
      return comment;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`Error in addComment: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Update comment
   */
  async updateComment(projectId, commentId, commentData, userId) {
    const project = await Project.findById(projectId);
    
    if (!project) {
      return null;
    }
    
    // Find the comment
    const comment = project.comments.id(commentId);
    
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    // Check if user is the comment author
    if (comment.author.id.toString() !== userId) {
      throw new Error('Not authorized to update this comment');
    }
    
    // Update comment
    return Project.findOneAndUpdate(
      { _id: projectId, 'comments.id': commentId },
      {
        $set: {
          'comments.$.content': commentData.content,
          'comments.$.updatedAt': new Date()
        }
      },
      { new: true }
    );
  }
  
  /**
   * Delete comment
   */
  async deleteComment(projectId, commentId, userId) {
    const project = await Project.findById(projectId);
    
    if (!project) {
      return null;
    }
    
    // Find the comment
    const comment = project.comments.id(commentId);
    
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    // Check if user is the comment author or project author
    const isCommentAuthor = comment.author.id.toString() === userId;
    const isProjectAuthor = project.author.id.toString() === userId;
    
    if (!isCommentAuthor && !isProjectAuthor) {
      throw new Error('Not authorized to delete this comment');
    }
    
    // Delete comment
    return Project.findByIdAndUpdate(
      projectId,
      { $pull: { comments: { id: commentId } } }
    );
  }
  
  /**
   * Add collaborator to project
   */
  async addCollaborator(projectId, collaboratorData, userId) {
    const project = await Project.findById(projectId);
    
    if (!project) {
      return null;
    }
    
    // Check if user is the project author
    if (project.author.id.toString() !== userId) {
      throw new Error('Not authorized to add collaborators');
    }
    
    // Check if user exists
    const collaborator = await User.findById(collaboratorData.id);
    
    if (!collaborator) {
      throw new Error('User not found');
    }
    
    // Check if already a collaborator
    const existingCollaborator = project.collaborators.find(
      c => c.id.toString() === collaboratorData.id
    );
    
    if (existingCollaborator) {
      // Update existing collaborator role
      return Project.findOneAndUpdate(
        { _id: projectId, 'collaborators.id': collaboratorData.id },
        { $set: { 'collaborators.$.role': collaboratorData.role } },
        { new: true }
      );
    }
    
    // Add new collaborator
    return Project.findByIdAndUpdate(
      projectId,
      {
        $push: {
          collaborators: {
            id: collaborator._id,
            name: collaborator.name,
            role: collaboratorData.role || 'viewer'
          }
        }
      },
      { new: true }
    );
  }
  
  /**
   * Remove collaborator from project
   */
  async removeCollaborator(projectId, collaboratorId, userId) {
    const project = await Project.findById(projectId);
    
    if (!project) {
      return null;
    }
    
    // Check if user is the project author
    if (project.author.id.toString() !== userId) {
      throw new Error('Not authorized to remove collaborators');
    }
    
    // Remove collaborator
    return Project.findByIdAndUpdate(
      projectId,
      { $pull: { collaborators: { id: collaboratorId } } }
    );
  }
}

module.exports = ProjectService;
