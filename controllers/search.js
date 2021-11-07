import axios from 'axios'

function weaponSearch(req, res){
  axios.get(`https://mhw-db.com/weapons?q={"name":"${req.body.query}"}`)
  // /skills?q={"name":"Poison Resistance"}
  // monsterhunter weapon address goes here using GET ^^^
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