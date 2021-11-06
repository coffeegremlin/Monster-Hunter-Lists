import axios from 'axios'

function weaponSearch(req, res){
  axios.get(``)
  // monsterhunter get address goes here ^^^
  .then(response => {
    res.render('search', {
      title: 'Weapon Search Results',
      user: req.user,
      weapon: response.data
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/weapon')
  })
}

export {
  weaponSearch
}