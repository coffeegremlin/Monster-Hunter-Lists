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
      weapon: response.data
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/weapon')
    // Make an error page to redirect to vvv
  })
}

function weaponTypeFilter(req, res){
  // Figure out how to call ALL weapons in the api here vvv
  // Push the value of the drop down selected to the axios request under "type"
  axios.get(`https://mhw-db.com/weapons?q={"type":"${req.body.query}"}`)
  .then(response => {
    console.log(response.data)
    res.render('search', {
      title: 'Weapon Type Results',
      user: req.user,
      weapon: response.data
    })
  })
  .catch(err => {
    console.log(err)
    // Make an error page to redirect to vvv
    res.redirect('/profiles/weapon')
  })
}

// function weaponNameFilter (req, res){
//   axios.get(`https://mhw-db.com/weapons?p={"name":true}`)
//   .then(response => {
//     res.render('search2', {
//       title: 'Weapon Name Results',
//       user: req.user,
//       weaponName: response.data
//     })
//   })
// }

export {
  weaponSearch,
  weaponTypeFilter,
  // weaponNameFilter,
}