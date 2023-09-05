const express = require('express');
const db = require("../db")
const utils = require("../utils");
const multer = require('multer')
const upload = multer({ dest: 'uploads' })


const router = express.Router()


//deleted the image in this api and adding in another api
//UPDATE THIS QUERY ---REMOVE THE COPY-COUNT AND MERGE THE AVAIALABLE_BOOKS IN THE BOOKS DONT SEPARATE
//an admin will be able to add the book(we need to check here if the category is available in booksCategories)
router.post("/add-new-book", (request, response) => {
  
  const { booksName, bookAuthor, bookPrice, bookDesc, idCategory, available_copies } = request.body
  const insertBookQuery = "INSERT INTO Books(booksName,bookAuthor,bookPrice,bookDesc,idCategory,available_copies) VALUES(?,?,?,?,?,?)"
  db.query(
    insertBookQuery,
    [ booksName, bookAuthor, bookPrice, bookDesc, idCategory, available_copies],
    (error, result) => {
      response.send(utils.createResult(error,result))

    }            
  )

})




router.post(
  '/upload-book-image/:idBooks',
  upload.single('image'),
  (request, response) => {
    const { idBooks } = request.params
    const filename = request.file.filename
    db.query(
      `update Books set bookImg = ? where idBooks = ?`,
      [filename, idBooks],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  }
)







//we can show all the book details to the admin

router.get("/all-books", (request, response) => {
  const statement = " SELECT Books.*, book_category.categoryName FROM Books INNER JOIN book_category ON Books.idCategory = book_category.idCategory"
  db.query(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})


//this api can show the home page where only the image, name and author will show
router.get("/home/all-books", (request, response) => {
  const statement = "SELECT b.idBooks, b.bookImg, b.booksName, b.bookAuthor, c.categoryName   FROM Books b  JOIN book_category c ON b.idCategory = c.idCategory;"
  db.query(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})




//to search the book by ID
router.get("/get-book/:idBooks", (request, response) => {
  const idBooks = request.params.idBooks
  const statement = `SELECT booksName,bookAuthor,bookPrice FROM Books WHERE idBooks=?`
  db.query(statement, [idBooks], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})


//to search the book by Book Name
router.get("/get-book-name/:booksName", (request, response) => {
  const booksName = request.params.booksName
  const statement = `SELECT * FROM Books WHERE booksName=?`
  db.query(statement, [booksName], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})


//to search the book by Book Author
router.get("/get-book-author/:bookAuthor", (request, response) => {
  const bookAuthor = request.params.bookAuthor
  const statement = `SELECT booksName FROM Books WHERE bookAuthor=?`
  db.query(statement, [bookAuthor], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})


//api is not written
//to search the book by Book category
router.get("/get-books/:idCategory", (request, response) => {
  const idCategory = request.params.idCategory
  const statement = `SELECT bookImg,booksName,bookAuthor FROM Books WHERE idCategory=?`
  db.query(statement, [idCategory], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})



//if admin want to change some parameter of existing book
router.put("/update-book/:idBooks", (request, response) => {
  const idBooks = request.params.idBooks
  const { bookDesc, bookPrice, available_copies } = request.body
  const updateBooks = `UPDATE Books SET bookDesc=?,bookPrice=?, available_copies = ? WHERE idBooks=?;`
  db.query(updateBooks, [bookDesc, bookPrice, available_copies, idBooks], (error, result) => {
    
    response.send(utils.createResult(error, result))

  })
})






//to delete the book
router.delete("/delete-book/:idBooks", (request, response) => {
  const idBooks = request.params.idBooks
  const statement = `DELETE FROM Books WHERE idBooks=?`
  db.query(statement, [idBooks], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

//get number of copies
router.get("/available-Book-count/:idBooks", (request, response) => {
  const idBooks = request.params.idBooks
  const statement = `SELECT available_copies FROM Books WHERE idBooks=?`
  db.query(statement, [idBooks], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})


module.exports = router