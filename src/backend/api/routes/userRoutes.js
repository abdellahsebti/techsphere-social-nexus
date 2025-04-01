
/**
 * User Routes
 * 
 * API endpoints for user management, profiles, and social connections.
 */
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const userValidation = require('../validations/userValidation');

const router = express.Router();

// Public routes
router.get('/', validate(userValidation.getUsers), userController.getUsers);
router.get('/:id', validate(userValidation.getUser), userController.getUser);

// Protected routes (require authentication)
router.use(auth);

router.put('/:id', validate(userValidation.updateUser), userController.updateUser);
router.post('/:id/follow', validate(userValidation.followUser), userController.followUser);
router.delete('/:id/follow', validate(userValidation.unfollowUser), userController.unfollowUser);
router.get('/:id/followers', validate(userValidation.getFollowers), userController.getFollowers);
router.get('/:id/following', validate(userValidation.getFollowing), userController.getFollowing);
router.post('/:id/skills', validate(userValidation.addSkill), userController.addSkill);
router.post('/:id/skills/:skillId/endorse', validate(userValidation.endorseSkill), userController.endorseSkill);
router.get('/:id/projects', validate(userValidation.getUserProjects), userController.getUserProjects);
router.get('/:id/ideas', validate(userValidation.getUserIdeas), userController.getUserIdeas);
router.get('/:id/xp-history', validate(userValidation.getXpHistory), userController.getXpHistory);
router.post('/:id/award-xp', validate(userValidation.awardXp), userController.awardXp);

module.exports = router;
