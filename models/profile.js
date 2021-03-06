import mongoose from 'mongoose'
const Schema = mongoose.Schema

const itemSchema = new Schema({
  itemDetailQuantity: String,
  itemDetailName: String,
})

const userItemListSchema = new Schema({
  itemUser: {type: String},
  numberHeld: { type: Number, min: 0}
}, {
  timestamps: true,
})

const craftListSchema = new Schema({
  name: String,
  type: String,
  imageUrl: String,
  itemObjects: [itemSchema],
  userList: [userItemListSchema],
  finished: {type: Boolean, default: false},
}, {
  timestamps: true
})

// const hunterSchema = new Schema({
//   hunters: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}
// })

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  weapon: [craftListSchema],
  // hunter: [hunterSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}