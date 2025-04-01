
/**
 * Project Model
 * 
 * Schema for projects shared on the platform.
 */
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
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
      maxlength: 500
    },
    content: {
      type: String,
      required: true,
      minlength: 10
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
    collaborators: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        name: {
          type: String
        },
        role: {
          type: String,
          enum: ['editor', 'viewer', 'contributor'],
          default: 'viewer'
        }
      }
    ],
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    attachments: [
      {
        name: {
          type: String,
          required: true
        },
        type: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        },
        key: {
          type: String
        },
        size: {
          type: Number
        },
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'schools'],
      default: 'public'
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
          maxlength: 1000
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
projectSchema.index(
  {
    title: 'text',
    description: 'text',
    content: 'text',
    tags: 'text'
  },
  {
    weights: {
      title: 10,
      tags: 5,
      description: 3,
      content: 1
    }
  }
);

// Add virtual for like count
projectSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Add virtual for comments count
projectSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
