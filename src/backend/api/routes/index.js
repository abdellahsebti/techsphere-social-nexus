
/**
 * API Routes Index
 * 
 * This file consolidates all API routes and exports them
 * as a single router object to be used in the Express app.
 */
const express = require('express');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const ideaRoutes = require('./ideaRoutes');
const skillRoutes = require('./skillRoutes');
const challengeRoutes = require('./challengeRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');
const searchRoutes = require('./searchRoutes');
const feedRoutes = require('./feedRoutes');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// API version and documentation
router.get('/', (req, res) => {
  res.status(200).json({
    name: 'TechSphere API',
    version: '1.0.0',
    description: 'Backend API for TechSphere Social Platform',
    documentation: '/api/docs'
  });
});

// Mount API routes
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/ideas', ideaRoutes);
router.use('/skills', skillRoutes);
router.use('/challenges', challengeRoutes);
router.use('/leaderboards', leaderboardRoutes);
router.use('/search', searchRoutes);
router.use('/feed', feedRoutes);

module.exports = router;
