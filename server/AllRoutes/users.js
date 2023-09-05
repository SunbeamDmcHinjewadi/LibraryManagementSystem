const express =  require('express');
const db = require("../db")
const utils = require("../utils")

const router = express.Router()

router.post("/login/patron", (request, response) => { //to login patron
    const { uEmail, uPassword } = request.body
    const statement = "select idusers, uName, uEmail, uContact, uCreatedAt from users where uEmail = ? and uPassword = ?"
    db.query(statement, [uEmail, uPassword], (error, result) => {
      if (result.length == 0) {
        // if user does not exist, users array will be empty
        response.send(utils.createResult('user does not exist'))
      } else {
        // if user exists, the users will be an array with one user entry
        const user = result[0]
  
        // create a payload
        const payload = {
          idusers: result['idusers'],
          uName: result['uName'],
          uEmail: result['uEmail'],
          uContact: result['uContact'],
          uCreatedAt: result['uCreatedAt']
        }
        response.send(
          utils.createResult(null, {
            idusers: user['idusers'],
            uName: user['uName'],
            uEmail: user['uEmail'],
            uContact: user['uContact'],
            uCreatedAt: user['uCreatedAt']
    })
        )
    }
  })

})



 router.post("/register", (request, response) => { //to register the patron 
    const { uName,uEmail,uContact,uPassword } = request.body
    db.query(
      "INSERT INTO users(uName,uEmail,uContact,uPassword) VALUES(?,?,?,?)",
      [uName,uEmail,uContact,uPassword],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  }) 


  //delete account
  router.delete("/delete-user/:idusers", (request, response) => {
    const idusers = request.params.idusers
    const statement = `DELETE FROM users WHERE idusers=?`
    db.query(statement, [idusers], (error, result) => {
      response.send(utils.createResult(error, result))
    })
  })



  //update account
  router.put("/update-user/:idusers",(request,response)=>{
      const idusers = request.params.idusers
      const {uName,uEmail,uContact}  = request.body
      const statement = "UPDATE users SET uName=?, uEmail=?, uContact=? WHERE idusers=?"
      db.query(statement, [uName,uEmail,uContact,idusers], (error,result)=>{
        response.send(utils.createResult(error,result))
      })
  })


  //get all users
  router.get("/get-all-users", (request, response)=> {
    const statement = "SELECT uName,uEmail,uContact FROM users"
    db.query(statement, (error,result)=>{
      response.send(utils.createResult(error, result))
    })
  })


  router.get("/get-user/:idusers",(request,response)=>{
    const idusers = request.params.idusers
    const statement = "SELECT uName,uEmail,uContact from users WHERE idusers=?"
    db.query(statement, [idusers], (error,result)=>{
      response.send(utils.createResult(error,result))
    })
})




router.get('/:idusers', (request, response) => {
  const idusers = request.params.idusers
  const statement = `SELECT * FROM users WHERE idusers=?`
  db.query(statement, [idusers], (error, users) => {
    if (users.length == 0) {
      response.send(utils.createResult('user does not exist'))
    } else {
      const user = users[0]
      response.send(
        utils.createResult(null, {
          idusers: user['idusers'],
          uName: `${user['uName']}`,
          uContact: user['uContact'],
          uCreatedAt: user['uCreatedAt'],
          
        })
      )
    }
  })
})

  module.exports = router