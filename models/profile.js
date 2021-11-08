import mongoose from 'mongoose'
const Schema = mongoose.Schema

const itemSchema = new Schema({
  id: String,
  name: String,
  quantity: Number,
})

const craftListSchema = new Schema({
  name: String,
  type: String,
  imageUrl: String,
  upgradeMaterials: [itemSchema],
  finished: Boolean,
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