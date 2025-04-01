
/**
 * User Model
 * 
 * Schema for user data including profile, skills, and social connections.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-zA-Z0-9_]+$/
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    avatar: {
      type: String,
      default: function() {
        return `https://i.pravatar.cc/150?u=${this._id}`;
      }
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500
    },
    school: {
      type: String,
      trim: true,
      maxlength: 100
    },
    specialization: {
      type: String,
      trim: true,
      maxlength: 100
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator', 'system'],
      default: 'user'
    },
    level: {
      type: Number,
      default: 1,
      min: 1
    },
    xp: {
      type: Number,
      default: 0,
      min: 0
    },
    skills: [
      {
        skillId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Skill',
          required: true
        },
        level: {
          type: Number,
          required: true,
          min: 1,
          max: 5
        },
        endorsements: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ]
      }
    ],
    badges: [
      {
        name: {
          type: String,
          required: true
        },
        description: {
          type: String
        },
        imageUrl: {
          type: String
        },
        earnedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true
        },
        expires: {
          type: Date,
          required: true
        }
      }
    ],
    emailVerified: {
      type: Boolean,
      default: false
    },
    lastActive: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Virtual for user's projects
userSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'author.id'
});

// Virtual for user's ideas
userSchema.virtual('ideas', {
  ref: 'Idea',
  localField: '_id',
  foreignField: 'author.id'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Calculate level from XP
userSchema.pre('save', function(next) {
  if (this.isModified('xp')) {
    // Level = 1 + floor(sqrt(XP / 100))
    this.level = Math.floor(1 + Math.sqrt(this.xp / 100));
  }
  
  next();
});

// Remove sensitive fields when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  
  delete user.password;
  delete user.tokens;
  
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
