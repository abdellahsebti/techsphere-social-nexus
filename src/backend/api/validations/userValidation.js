
/**
 * User Validation Schemas
 * 
 * Joi validation schemas for user-related API endpoints.
 */
const Joi = require('joi');
const { objectId } = require('./customValidators');

// Get users validation schema
const getUsers = {
  query: Joi.object().keys({
    search: Joi.string(),
    school: Joi.string(),
    skill: Joi.string(),
    level: Joi.number().integer().min(1),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sort: Joi.string()
  })
};

// Get user validation schema
const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  })
};

// Update user validation schema
const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(50),
      username: Joi.string().min(3).max(20).pattern(/^[a-zA-Z0-9_]+$/),
      avatar: Joi.string().uri(),
      bio: Joi.string().max(500),
      school: Joi.string().max(100),
      specialization: Joi.string().max(100),
      email: Joi.string().email()
    })
    .min(1)
};

// Follow user validation schema
const followUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  })
};

// Unfollow user validation schema
const unfollowUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  })
};

// Get followers validation schema
const getFollowers = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  }),
  query: Joi.object().keys({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100)
  })
};

// Get following validation schema
const getFollowing = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  }),
  query: Joi.object().keys({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100)
  })
};

// Add skill validation schema
const addSkill = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  }),
  body: Joi.object().keys({
    skill: Joi.alternatives().try(
      Joi.string().custom(objectId).required(),
      Joi.object().keys({
        name: Joi.string().required().min(2).max(50),
        category: Joi.string().required().min(2).max(50)
      })
    ).required(),
    level: Joi.number().integer().min(1).max(5).required()
  })
};

// Endorse skill validation schema
const endorseSkill = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    skillId: Joi.string().custom(objectId).required()
  })
};

// Get user projects validation schema
const getUserProjects = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  }),
  query: Joi.object().keys({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sort: Joi.string()
  })
};

// Get user ideas validation schema
const getUserIdeas = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  }),
  query: Joi.object().keys({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sort: Joi.string()
  })
};

// Get XP history validation schema
const getXpHistory = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  }),
  query: Joi.object().keys({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso()
  })
};

// Award XP validation schema
const awardXp = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  }),
  body: Joi.object().keys({
    amount: Joi.number().integer().required().min(1),
    reason: Joi.string().required().min(2).max(100),
    sourceType: Joi.string().valid('project', 'idea', 'challenge', 'reaction', 'comment', 'endorsement', 'admin').required(),
    sourceId: Joi.string().custom(objectId)
  })
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
