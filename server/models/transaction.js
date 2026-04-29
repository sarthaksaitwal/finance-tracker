import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0 // ✅ amount validation (no negative values)
    },

    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    // ✅ Added description
    description: {
      type: String,
      trim: true,
      maxlength: 200
    },

    // ✅ Added payment method
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'upi', 'bank'],
      default: 'cash'
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

// ✅ Added index for better query performance
transactionSchema.index({ userId: 1, date: -1 })

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction