
/**
 * WebSocket Configuration
 * 
 * Set up real-time communication with Socket.io.
 */
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/user.model');
const logger = require('../utils/logger');

/**
 * Configure Socket.io with the HTTP server
 * @param {Object} server - HTTP server
 * @returns {Object} Socket.io instance
 */
const setupSocketIO = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error: Token missing'));
      }

      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await User.findById(decoded.sub);

      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      // Store user data in socket for later use
      socket.user = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      };
      
      next();
    } catch (error) {
      logger.error(`Socket authentication error: ${error.message}`);
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.user?.id}`);
    
    // Join user-specific room for targeted events
    socket.join(`user:${socket.user.id}`);
    
    // Handle events
    setupEventHandlers(io, socket);

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.user?.id}`);
    });
  });

  return io;
};

/**
 * Set up event handlers for socket
 * @param {Object} io - Socket.io instance
 * @param {Object} socket - Socket connection
 */
const setupEventHandlers = (io, socket) => {
  // Notifications
  socket.on('notifications:get', async () => {
    try {
      // Implement fetching user notifications
      const notifications = []; // Replace with actual notifications from database
      
      socket.emit('notifications:list', notifications);
    } catch (error) {
      logger.error(`Error fetching notifications: ${error.message}`);
      socket.emit('error', { message: 'Failed to fetch notifications' });
    }
  });

  // Chat
  socket.on('chat:join', (conversationId) => {
    socket.join(`conversation:${conversationId}`);
    logger.info(`User ${socket.user.id} joined conversation ${conversationId}`);
  });

  socket.on('chat:leave', (conversationId) => {
    socket.leave(`conversation:${conversationId}`);
    logger.info(`User ${socket.user.id} left conversation ${conversationId}`);
  });

  socket.on('chat:message', (data) => {
    // Implement message handling
    io.to(`conversation:${data.conversationId}`).emit('chat:message', {
      ...data,
      sender: {
        id: socket.user.id,
        name: socket.user.name,
        avatar: socket.user.avatar
      },
      timestamp: new Date()
    });
  });

  // Typing indicator
  socket.on('chat:typing', (data) => {
    socket.to(`conversation:${data.conversationId}`).emit('chat:typing', {
      user: {
        id: socket.user.id,
        name: socket.user.name
      },
      isTyping: data.isTyping
    });
  });

  // Project collaboration
  socket.on('project:join', (projectId) => {
    socket.join(`project:${projectId}`);
    logger.info(`User ${socket.user.id} joined project collaboration ${projectId}`);
  });

  socket.on('project:leave', (projectId) => {
    socket.leave(`project:${projectId}`);
    logger.info(`User ${socket.user.id} left project collaboration ${projectId}`);
  });

  // Handle other events as needed
};

module.exports = setupSocketIO;
