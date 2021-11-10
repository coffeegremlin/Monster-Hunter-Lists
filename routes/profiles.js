import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
const router = Router()

// localhost:3000/weapons - POST
router.post('/weapon', isLoggedIn, profilesCtrl.addToCraftList)
// localhost:3000/:id/weapon - GET
router.get('/:id/weapon', isLoggedIn, profilesCtrl.craftList)
// localhost:3000/:profileId/weapon/:weaponId - GET
router.get('/:profileId/weapon/:weaponId', isLoggedIn, profilesCtrl.showWeapon)
// localhost:3000/ - POST
router.post('/:profileId/weapon/:weaponId', isLoggedIn, profilesCtrl.create)
// localhost:3000/:profileId/weapon/:weaponId - DELETE
router.delete('/:profileId/weapon/:weaponId', isLoggedIn, profilesCtrl.delete)


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/auth/google')
}

export {
  router
}