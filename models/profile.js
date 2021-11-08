import mongoose from 'mongoose'
const Schema = mongoose.Schema

// const itemSchema = new Schema({
//   itemAmount: String,
//   itemName: String,
// }, {
//   timestamps: true
// })

const craftListSchema = new Schema({
  name: String,
  type: String,
  imageUrl: String,
  itemAmount: String,
  itemName: String,
  finished: Boolean,
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