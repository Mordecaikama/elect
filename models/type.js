const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const typeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter title of election type'],
      maxlength: 32,
    },
    description: {
      type: String,
    },
    candidates: [{ type: ObjectId, ref: 'Candidate' }],
  },

  { timestamps: true }
)

const Type = mongoose.model('Type', typeSchema)

module.exports = Type
