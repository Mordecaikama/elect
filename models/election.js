const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const electionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter Organisation name'],
      maxlength: 32,
    },
    startDate: {
      type: String,
      required: [true, 'Please enter start date'],
    },
    endDate: {
      type: String,
      required: [true, 'Please enter start date'],
    },
    voters: [{ type: ObjectId, ref: 'Voter' }],
    type: [{ type: ObjectId, ref: 'Type' }],
  },

  { timestamps: true }
)

const Election = mongoose.model('Election', electionSchema)

module.exports = Election
