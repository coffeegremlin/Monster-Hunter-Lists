import axios from 'axios'
import { response } from 'express'

function weaponSearch(req, res){
  axios.get(`https://mhw-db.com/weapons?q={"name":"${req.body.query}"}`)
  // monsterhunter weapon address goes here using GET ^^^
  .then(response => {
    console.log(response.data)
    res.render('search', {
      title: 'Weapon Search Results',
      user: req.user,
      weapons: response.data
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/weapon')
  })
}

function weaponTypeFilter (req, res){
  axios.get(`https://mhw-db.com/weapons?p={"type":true}`)
  .then(response => {
    res.render('search1', {
      title: 'Weapon Type Results',
      user: req.user,
      weaponType: response.data
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/weapon')
  })
}

function weaponNameFilter (req, res){
  axios.get(`https://mhw-db.com/weapons?p={"name":true}`)
  .then(response => {
    res.render('search2', {
      title: 'Weapon Name Results',
      user: req.user,
      weaponName: response.data
    })
  })
}

export {
  weaponSearch,
  weaponTypeFilter,
  weaponNameFilter,
}