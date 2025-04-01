
/**
 * Project Routes
 * 
 * API endpoints for project management and interaction.
 */
const express = require('express');
const projectController = require('../controllers/projectController');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const projectValidation = require('../validations/projectValidation');

const router = express.Router();

// Public routes
router.get('/', validate(projectValidation.getProjects), projectController.getProjects);
router.get('/:id', validate(projectValidation.getProject), projectController.getProject);

// Protected routes (require authentication)
router.use(auth);

router.post('/', validate(projectValidation.createProject), projectController.createProject);
router.put('/:id', validate(projectValidation.updateProject), projectController.updateProject);
router.delete('/:id', validate(projectValidation.deleteProject), projectController.deleteProject);
router.post('/:id/like', validate(projectValidation.likeProject), projectController.likeProject);
router.delete('/:id/like', validate(projectValidation.unlikeProject), projectController.unlikeProject);
router.post('/:id/reaction', validate(projectValidation.addReaction), projectController.addReaction);
router.delete('/:id/reaction/:reactionType', validate(projectValidation.removeReaction), projectController.removeReaction);
router.post('/:id/comments', validate(projectValidation.addComment), projectController.addComment);
router.put('/:id/comments/:commentId', validate(projectValidation.updateComment), projectController.updateComment);
router.delete('/:id/comments/:commentId', validate(projectValidation.deleteComment), projectController.deleteComment);
router.post('/:id/collaborators', validate(projectValidation.addCollaborator), projectController.addCollaborator);
router.delete('/:id/collaborators/:userId', validate(projectValidation.removeCollaborator), projectController.removeCollaborator);

module.exports = router;
