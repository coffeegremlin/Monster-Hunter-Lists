import { Profile } from '../models/profile.js'

// function passUserToView(req, res, next) {
//   res.locals.user = req.user ? req.user : null
//   next()
// }

// function indexProfiles(req, res) {
//   Profile.find({})
//   .then(hunter => {
//     res.render("/", {
//       hunter,
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/')
//   })
// }

// function showProfiles(req, res) {
//   Profile.findById(req.params.id)
//   .then(profile => {
//     Profile.findById(req.user.profile._id)
//     .then(self => {
//       const isSelf = self._id.equals(profile._id)
//       Profile.find({hunter: profile._id})
//       .then(isHunter => {
//         res.render("/", {
//           profile,
//           self,
//           isSelf,
//           isHunter
//         })
//       })
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect(`/profiles/${req.user.profile._id}`)
//   })
// }

async function addToCraftList(req, res){
  try {
    const profile = await Profile.findById(req.user.profile._id)
    profile.weapon.push(req.body)
    const items = await sortItemSchema(req.body)
    items.forEach(function(item){
      profile.weapon[profile.weapon.length-1].itemObjects.push(item)
    })
    profile.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

async function sortItemSchema(body) {
  const arrayItems = []
  for (const property in body) {
    if (property.includes('itemDetail')) {
      const item = {}
      item[property.slice(0, -1)] = body[property]
      for (const propertyTwo in body) {
        if (propertyTwo.includes(property.slice(property.length - 1))) {
          item[propertyTwo.slice(0, -1)] = body[propertyTwo]
          delete body[propertyTwo]
        }
      }
      delete body[property]
      arrayItems.push(item)
    }
  }
  return arrayItems
}

function craftList(req, res){
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profiles/craftList', {
      title: `${profile.name}'s Crafting List`,
      user: req.user,
      profile
    })
  })
}

function showWeapon(req, res){
  Profile.findById(req.params.profileId)
  .then(profile => {
    console.log('BIG COMMENT: ', profile)
    let weapon = profile.weapon.find(weapon => String(weapon._id) === req.params.weaponId)
    res.render('profiles/craftShow', {
      title: `${profile.name}'s Weapons`,
      user: req.user,
      profile,
      weapon,
      userItemName: profile.weapon.itemObjects,
      itemList: profile.weapon.userList,
    })
  })
}

function createItemListing (req, res){
  Profile.findById(req.params.profileId)
  .then(profile => {
    const weapon = profile.weapon.id(req.params.weaponId)
    weapon.userList.push(req.body)
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${profile._id}/weapon/${weapon._id}`)
    })
  })
}

function editItemListing(req, res){
  const itemId = req.body.itemId
  Profile.findByIdAndUpdate(req.params.profileId)
  .then(profile => {
    const weapon = profile.weapon.id(req.params.weaponId)
    const userList = weapon.userList
    let thisItem
    if (userList.length){
      userList.forEach(item=>{
        if (item._id == itemId){
          thisItem = item
        }
      })
    }
    thisItem.numberHeld = req.body.numberHeld
    profile.save()
    .then(()=> {
      (res.redirect(`/profiles/${profile._id}/weapon/${weapon._id}`))
    })
  })
}

function removeItemListing(req, res){
  const itemId = req.body.itemId
  Profile.findById(req.params.profileId)
  .then(profile => {
    const weapon = profile.weapon.id(req.params.weaponId)
    const userList = weapon.userList
    userList.remove({_id:itemId})
    profile.save()
    .then(()=> {
      (res.redirect(`/profiles/${profile._id}/weapon/${weapon._id}`))
    })
  })
}

function deleteWeapon(req, res){
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.weapon.remove(req.params.weaponId)
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${profile._id}/weapon`)
    })
  })
}

// add finished boolean checkbox functionality

export {
  // passUserToView,
  // indexProfiles,
  // showProfiles,
  addToCraftList,
  createItemListing as create,
  editItemListing as edit,
  removeItemListing,
  craftList,
  showWeapon,
  deleteWeapon,
}