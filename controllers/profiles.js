import { Profile } from '../models/profile.js'

function addToCraftList(req, res){
  console.log(req.body)
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.weapon.push(req.body)
    profile.save()
    .then(()=> {
      res.redirect('/')
    })
  })
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
    let index = profile.weapon.findIndex(item => item._id == req.params.weaponId)
    res.render('profiles/craftShow', {
      title: `${profile.name}'s Weapons`,
      user: req.user,
      profile,
      weapon: profile.weapon[index],
      userItem: profile.weapon.userItem
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

// add edit/update/save functionality for user item list

// add finished boolean checkbox functionality

// add delete functionality for individual showWeapon listings if finished === true

export {
  addToCraftList,
  craftList,
  showWeapon,
  deleteWeapon as delete,
}