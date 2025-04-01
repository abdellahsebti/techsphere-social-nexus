
/**
 * Skill Model
 * 
 * Schema for skills that users can add to their profiles and get endorsed for.
 */
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 50
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    popularityScore: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Create index for searching
skillSchema.index({ name: 'text', category: 'text' });

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
