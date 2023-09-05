const express = require("express")
const cors = require("cors")
const routerUsers = require("./AllRoutes/users")
const routerBooks = require("./AllRoutes/CRUDbooks")
const routerBookCategory = require("./AllRoutes/bookCategories")
const routerTransactions = require("./AllRoutes/transaction")
const routerAdminAndLibrarian = require("./AllRoutes/Admin")


const app = express()
app.use(express.json())
app.use(cors("*"))
app.use(express.static("uploads"))

app.use("/users", routerUsers)
app.use("/books", routerBooks)
app.use("/category", routerBookCategory)
app.use("/transaction", routerTransactions)
app.use("/AdminAndLibrarian", routerAdminAndLibrarian)

app.listen(4000, "0.0.0.0", () => {
    console.log("Server started at port 4000")
  })