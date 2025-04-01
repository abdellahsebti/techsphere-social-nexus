
/**
 * Idea Model
 * 
 * Schema for idea posts shared on the platform.
 */
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      school: {
        type: String
      }
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    helpNeeded: [
      {
        type: String,
        trim: true
      }
    ],
    status: {
      type: String,
      enum: ['open', 'in_progress', 'completed', 'archived'],
      default: 'open'
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    reactions: [
      {
        type: {
          type: String,
          enum: ['like', 'genius', 'collab', 'game_changer', 'achievement'],
          required: true
        },
        users: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ]
      }
    ],
    comments: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        author: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          name: {
            type: String,
            required: true
          },
          avatar: {
            type: String
          }
        },
        content: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 500
        },
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date
        }
      }
    ],
    interestedCollaborators: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        name: {
          type: String
        },
        avatar: {
          type: String
        },
        message: {
          type: String,
          maxlength: 500
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending'
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    views: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Create text index for searching
ideaSchema.index(
  {
    title: 'text',
    description: 'text',
    tags: 'text',
    helpNeeded: 'text'
  },
  {
    weights: {
      title: 10,
      tags: 5,
      helpNeeded: 5,
      description: 3
    }
  }
);

// Add virtual for like count
ideaSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Add virtual for comments count
ideaSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
