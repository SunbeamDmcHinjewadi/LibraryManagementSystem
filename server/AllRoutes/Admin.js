const express =  require('express');
const db = require("../db")
const utils = require("../utils")

const router = express.Router()

router.post("/login", (request, response) => { //to login Admin or Librarian
    const { email, password } = request.body;
    const statement = "SELECT * FROM Admin WHERE email = ? AND password = ?";
    db.query(statement, [email, password], (error, result) => {
      if (error) {
        response.send(utils.createResult(error));
      } else {
        if (result.length > 0) {
          const user = result[0];
          if (user.role === "Admin") {
            // Handle Admin login
            // Return the result or perform additional operations for Admin role
            response.send(utils.createResult(null, { user, isAdmin: true }));
          } else if (user.role === "Librarian") {
            // Handle Librarian login
            // Return the result or perform additional operations for Librarian role
            response.send(utils.createResult(null, { user, isAdmin: false }));
          } else {
            // Handle other roles, if needed
            response.send(utils.createResult("Unknown role"));
          }
        } else {
          // No user found with the provided email and password
          response.send(utils.createResult("Invalid credentials"));
        }
      }
    });
  });
  

 router.post("/register", (request, response) => { //to register the Admin and Librarian 
    const { name, email, contactNo, role, password } = request.body
    db.query(
      "INSERT INTO Admin(name, email, contactNo, role, password) VALUES(?,?,?,?,?)",
      [name, email, contactNo, role, password],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  }) 


  //delete account
  router.delete("/delete-user/:idUser", (request, response) => {
    const idUser = request.params.idUser
    const statement = `DELETE FROM Admin WHERE idUser=?`
    db.query(statement, [idUser], (error, result) => {
      response.send(utils.createResult(error, result))
    })
  })



  //update account
  //not updating the values
  router.put("/update-user/:idUser",(request,response)=>{
      const idUser = request.params.idUser
      const {name, email, contactNo,}  = request.body
      const statement = "UPDATE Admin SET name=?, email=?, contactNo=? WHERE idUser=?"
      db.query(statement, [name, email, contactNo,,idUser], (error,result)=>{
        response.send(utils.createResult(error,result))
      })
  })


  router.get("/get-all-users",(request,response)=>{
    const statement = "SELECT * FROM Admin"
    db.query(statement, (error,result)=>{
      response.send(utils.createResult(error,result))
    })
})

//add in postman
//to show profile
router.get("/get-userById/:idUser", (request,response)=>{
  const idUser = request.params.idUser
  const statement = "SELECT * FROM Admin where udIser = ?"
  db.query(statement,[idUser],(error,result)=>{
    response.send(utils.createResult(error,result))
  })
})


  module.exports = router