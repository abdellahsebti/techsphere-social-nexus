
/**
 * XP Transaction Model
 * 
 * Schema for tracking XP earned by users.
 */
const mongoose = require('mongoose');

const xpTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    sourceType: {
      type: String,
      enum: ['project', 'idea', 'challenge', 'reaction', 'comment', 'endorsement', 'admin'],
      required: true
    },
    sourceId: {
      type: mongoose.Schema.Types.ObjectId
    },
    oldTotal: {
      type: Number,
      required: true
    },
    newTotal: {
      type: Number,
      required: true
    },
    levelUp: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const XpTransaction = mongoose.model('XpTransaction', xpTransactionSchema);

module.exports = XpTransaction;
