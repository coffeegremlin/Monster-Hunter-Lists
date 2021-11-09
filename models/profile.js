import mongoose from 'mongoose'
const Schema = mongoose.Schema

const itemSchema = new Schema({
  itemDetailQuantity: Number,
  itemDetailName: String,
})

const craftListSchema = new Schema({
  name: String,
  type: String,
  imageUrl: String,
  itemObjects: [itemSchema],
  finished: {type: Boolean, default: false},
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  weapon: [craftListSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}