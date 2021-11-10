import { Profile } from '../models/profile.js'

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
  const arr = []
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
      arr.push(item)
    }
  }
  return arr
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
      // userItemAmount: profile.weapon.itemObjects.itemDetailQuantity,
    })
  })
}

function createItemListing (req, res){
  // req.body.finished = !!req.body.finished
  Profile.findById(req.params.profileId)
  .then(profile => {
    const weapon = profile.weapon.find(weapon => req.params.weaponId === String(weapon._id))
console.log('weapon 71', weapon)
    const weaponIndex = profile.weapon.findIndex(weapon => req.params.weaponId === String(weapon._id))
console.log('weapon index 73', weaponIndex)
console.log('req body userlist 75', req.body.userList)
    profile.weapon[weaponIndex].userList.push(req.body)
console.log('req body 77', req.body)
console.log('oh god oh god weaponindex 79', profile.weapon[weaponIndex])
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${profile._id}/weapon/${weapon._id}`)
    })
  })
}

// profile.weapon[profile.weapon.length-1].itemObjects.push

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

// add edit/update/save functionality for user item list

// add finished boolean checkbox functionality

// add delete functionality for individual showWeapon listings if finished === true

export {
  addToCraftList,
  createItemListing as create,
  craftList,
  showWeapon,
  deleteWeapon as delete,
}