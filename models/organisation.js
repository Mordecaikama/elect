const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const organisationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter Organisation name'],
      maxlength: 32,
    },
    size: {
      type: Number,
      required: [true, 'choose size of Organisation'],
    },
    elections_per_year: {
      type: Number,
      required: [true, 'How many elections per year'],
    },
    elections: [{ type: ObjectId, ref: 'Election' }],
    user: { type: ObjectId, ref: 'User' },
    slug: {
      type: String,
      maxlength: 32,
    },
    state: {
      type: String,
    },
    subdomain: {
      type: String,
      maxlength: 32,
    },
    subdomain_url: {
      type: String,
    },

    logo: {
      type: String,
    },
  },

  { timestamps: true }
)

const Organisation = mongoose.model('Organisation', organisationSchema)

module.exports = Organisation
