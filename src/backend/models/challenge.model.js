
/**
 * Challenge Model
 * 
 * Schema for challenges and competitions on the platform.
 */
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
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
      minlength: 10
    },
    rules: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    registrationDeadline: {
      type: Date,
      required: true
    },
    organizer: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['user', 'school', 'admin'],
        default: 'user'
      }
    },
    schools: [
      {
        type: String,
        trim: true
      }
    ],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      required: true
    },
    maxParticipants: {
      type: Number
    },
    participants: [
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
        school: {
          type: String
        },
        joinedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    teams: [
      {
        name: {
          type: String,
          required: true
        },
        members: [
          {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
            },
            name: {
              type: String
            },
            role: {
              type: String
            }
          }
        ]
      }
    ],
    submissions: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        participant: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          },
          name: {
            type: String
          }
        },
        team: {
          type: String
        },
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project'
        },
        description: {
          type: String
        },
        submittedAt: {
          type: Date,
          default: Date.now
        },
        score: {
          type: Number
        },
        feedback: {
          type: String
        },
        rank: {
          type: Number
        }
      }
    ],
    prizes: [
      {
        rank: {
          type: Number,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        xp: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    resources: [
      {
        title: {
          type: String,
          required: true
        },
        description: {
          type: String
        },
        url: {
          type: String
        }
      }
    ],
    status: {
      type: String,
      enum: ['draft', 'open', 'active', 'judging', 'completed'],
      default: 'draft'
    },
    visibility: {
      type: String,
      enum: ['public', 'schools', 'private'],
      default: 'public'
    },
    featuredImage: {
      type: String
    },
    xpReward: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

// Create text index for searching
challengeSchema.index(
  {
    title: 'text',
    description: 'text',
    category: 'text',
    tags: 'text'
  },
  {
    weights: {
      title: 10,
      category: 5,
      tags: 5,
      description: 3
    }
  }
);

// Add virtual for participant count
challengeSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});

// Add virtual for days left
challengeSchema.virtual('daysLeft').get(function() {
  const now = new Date();
  const end = new Date(this.endDate);
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
