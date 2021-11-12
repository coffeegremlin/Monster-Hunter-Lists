import { Router } from 'express'
import * as searchCtrl from '../controllers/search.js'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Home Page', user: req.user ? req.user : null })
})

router.post('/weaponSearch', isLoggedIn, searchCtrl.weaponSearch)

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/auth/google')
}

export {
  router
}
