import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price_start: {
    type: Number,
    required: true
  },
  price_end: {
    type: Number,
  },
  type: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
})

export default mongoose.model('Post', PostSchema);
