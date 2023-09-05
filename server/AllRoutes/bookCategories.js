const express =  require('express');
const db = require("../db")
const utils = require("../utils")

const router = express.Router()

router.post("/book-categories", (request,response)=>
{
    const { categoryName } = request.body
    const statement = "INSERT INTO Book_Category(categoryName) VALUES(?)"
    db.query(
      statement,
      [categoryName],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )

})



  //get all categories
  router.get("/get-all-categories", (request, response)=> {
    const statement = "SELECT *  FROM Book_Category"
    db.query(statement, (error,result)=>{
      response.send(utils.createResult(error, result))
    })
  })



//DELETING THE BOOK CATEGORIES
router.delete("/delete-category/:idCategory", (request, response) => {
  const idCategory = request.params.idCategory
  const statement = `DELETE FROM Book_Category WHERE idCategory=?`
  db.query(statement, [idCategory], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})








module.exports = router