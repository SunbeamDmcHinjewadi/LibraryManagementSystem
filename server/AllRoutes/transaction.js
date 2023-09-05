const express = require('express');
const db = require("../db")
const utils = require("../utils")
//to set the data formate
const moment = require('moment');

const router = express.Router()


//create same api for react client project

//USER will allocate new book(issue)
router.post("/issue-new-book", (request, response) => {
    const { user_id, book_id, due_date } = request.body
    console.log(user_id, book_id, due_date)
    
    const formattedDueDate = moment(due_date, "MMM-DD-YYYY").format("YYYY-MM-DD");
    console.log(user_id, book_id, formattedDueDate)
    const statement = "INSERT INTO transaction (user_id,book_id,due_date, fine_amount) VALUES (?,?,?,0) "
    const borrowedQuery = "UPDATE Books SET available_copies = available_copies - 1 WHERE idBooks = ?;"
    console.log(due_date);
    db.query(
        statement,
        [user_id, book_id, formattedDueDate],
        (error, result) => {
            if (error) {
                response.send(utils.createResult(error, null))
            } else {
                //const idbooks_taken = transaction.insertId
                //console.log("response:",response);
                db.query(
                    borrowedQuery,
                    [book_id], (error, result) => {
                    response.send(utils.createResult(error, result))
                })
            }
        }

    )
})

router.post("/issue-new-book-for-react", (request, response) => {
    const { user_id, book_id, due_date } = request.body
    console.log(user_id, book_id, due_date)
    
    const formattedDueDate = moment(due_date, "YYYY-MM-DD").format("YYYY-MM-DD");
    console.log(user_id, book_id, formattedDueDate)
    const statement = "INSERT INTO transaction (user_id,book_id,due_date, fine_amount) VALUES (?,?,?,0) "
    const borrowedQuery = "UPDATE Books SET available_copies = available_copies - 1 WHERE idBooks = ?;"
    console.log(due_date);
    db.query(
        statement,
        [user_id, book_id, formattedDueDate],
        (error, result) => {
            if (error) {
                response.send(utils.createResult(error, null))
            } else {
                //const idbooks_taken = transaction.insertId
                //console.log("response:",response);
                db.query(
                    borrowedQuery,
                    [book_id], (error, result) => {
                    response.send(utils.createResult(error, result))
                })
            }
        }

    )
})



//while returning the book it will basically increament the available copy of book
/* router.put("/return-book-date/:idbooks_taken/:user_id/:book_id", (request, response) => {
    const idbooks_taken = request.params.idbooks_taken
    const user_id = request.params.user_id
    const book_id = request.params.book_id
    //const { available_copies } = request.body
    const returnedDateQuery = "UPDATE transaction SET returned_date = CURRENT_TIMESTAMP WHERE idbooks_taken=? AND user_id = ? AND book_id = ?"
    const returnedBookQuery = "UPDATE Books SET available_copies = available_copies + 1 WHERE idBooks = ?;"
  
  
    db.query(returnedDateQuery, [idbooks_taken,user_id,book_id], (error, result) => {
      if (error) {
        db.end
        response.send(utils.createResult(error, null))
      } else {
  
        db.query(returnedBookQuery, [book_id], (error, result) => {
       
               response.send(utils.createResult(error, result))
        })
      }
    })
  }) */
  

  router.put("/return-book-date/:idbooks_taken/:user_id/:book_id", (request, response) => {
    const idbooks_taken = request.params.idbooks_taken;
    const user_id = request.params.user_id;
    const book_id = request.params.book_id;
    console.log(idbooks_taken+user_id+book_id);
    const returnedDateQuery = "UPDATE transaction SET returned_date = CURRENT_TIMESTAMP WHERE idbooks_taken=? AND user_id = ? AND book_id = ?";
    const returnedBookQuery = "UPDATE Books SET available_copies = available_copies + 1 WHERE idBooks = ?;";

    db.query(returnedDateQuery, [idbooks_taken, user_id, book_id], (error, result) => {
        if (error) {
            db.end();
            response.send(utils.createResult(error, null));
        } else {
            db.query(returnedBookQuery, [book_id], (error, result) => {
                if (error) {
                    db.end();
                    response.send(utils.createResult(error, null));
                } else {
                    console.log(request.body);
                    updateFineAmount(idbooks_taken);
                    response.send(utils.createResult(null, result));
                }
            });
        }
    });
});

function updateFineAmount(idbooks_taken) {
    const fineQuery = "UPDATE transaction SET fine_amount = TIMESTAMPDIFF(DAY, due_date, returned_date) * 5 WHERE returned_date IS NOT NULL AND fine_amount = 0 AND idbooks_taken = ?;";

    db.query(fineQuery, [idbooks_taken], (error, result) => {
        if (error) {

            console.error("Error updating fine amount:", error);
        } else {
            
            console.log("Fine amount updated successfully");
        }
    });
}



//deleteing the transaction
router.delete("/return-book-delete/:idbooks_taken/:user_id/:book_id", (request, response) => {
    const idbooks_taken = request.params.idbooks_taken;
    const user_id = request.params.user_id;
    const book_id = request.params.book_id;
    
    const returnedBookDelete = "DELETE FROM transaction WHERE idbooks_taken = ? AND user_id = ? AND book_id = ? AND returned_date IS NOT NULL";

    db.query(returnedBookDelete, [idbooks_taken, user_id, book_id], (error, result) => {
        response.send(utils.createResult(error, result));

    });
});




//showing all the borrowed books WHO havent returned the book
router.get("/all-borrowed-book-not-returned", (request, response) =>{
    const statement = "SELECT * FROM transaction WHERE returned_date IS NULL"

    db.query(statement, (error,result)=>{
        response.send(utils.createResult(error,result))
    })
})


//showing all the borrowed books who  returned the book
router.get("/all-borrowed-book", (request, response) =>{
    const statement = "SELECT * FROM transaction WHERE returned_date IS NOT NULL"

    db.query(statement, (error,result)=>{
        response.send(utils.createResult(error,result))
    })
})




//fine amount
router.post("/fine-amount/:idbooks_taken", (request, response)=>{

    const fine = `UPDATE transaction SET fine_amount = TIMESTAMPDIFF(DAY, due_date, returned_date) * 5 WHERE returned_date IS NOT NULL AND fine_amount = 0 AND idbooks_taken = ?;`;

    const idbooks_taken = request.params.idbooks_taken
    db.query(fine, [idbooks_taken], (error,result)=>{
    response.send(utils.createResult(error,result))
    })

}) 



//to show fine amount to that perticular user
// router.get("/transaction-per-book/:user_id", (request, response)=>{
//     const user_id = request.params.user_id
//     const fine_amount_perBook = "SELECT book_id, issue_date, due_date, fine_amount FROM transaction WHERE user_id = ?"
//     db.query(fine_amount_perBook, [user_id], (error,result)=>{
//     response.send(utils.createResult(error,result))
//     })

// })

router.get("/transaction-per-book-for-app/:user_id", (request, response) => {
    const user_id = request.params.user_id;
    const fine_amount_perBook = `SELECT t.idbooks_taken, t.book_id, b.booksName AS book_name, t.due_date, t.fine_amount
    FROM transaction AS t
    JOIN Books AS b ON t.book_id = b.idBooks
    JOIN users AS u ON t.user_id = u.idusers
    WHERE t.user_id = ?;`;
    
    db.query(fine_amount_perBook, [user_id], (error, result) => {
        if (error) {
            response.send(utils.createResult(error, null));
        } else {
            // Convert date fields to string format before sending the response
            const transactionsWithDatesAsString = result.map(transaction => {
                const due_date = transaction.due_date.toISOString().substring(0, 10);
                return {
                    ...transaction,
                    due_date
                   
                };
            });

            response.send(utils.createResult(null, transactionsWithDatesAsString));
        }
    });
}); 






router.get("/transaction-per-book/:user_id", (request, response) => {
    const user_id = request.params.user_id;

    const issueBooks = `
        SELECT t.idbooks_taken, t.book_id, b.booksName AS book_name, t.due_date,t.returned_date, t.fine_amount
        FROM transaction AS t
        JOIN Books AS b ON t.book_id = b.idBooks
        JOIN users AS u ON t.user_id = u.idusers
        WHERE t.user_id = ?;
    `;

    db.query(issueBooks, [user_id], (error, result) => {
        if (error) {
            response.send(utils.createResult(error, null));
        } else {
            // Format the due_date using Moment.js
            const transactionsWithFormattedDueDate = result.map(transaction => {
                return {
                    ...transaction,
                    due_date: moment(transaction.due_date).format('DD-MM-YYYY') // Format as desired
                };
            });

            response.send(utils.createResult(null, transactionsWithFormattedDueDate));
        }
    });
});


/* function updateFineAmount(transactions, idbooks_taken) {
    transactions.forEach(transaction => {
        const fineQuery = "UPDATE transaction SET fine_amount = TIMESTAMPDIFF(DAY, due_date, returned_date) * 5 WHERE returned_date IS NOT NULL AND fine_amount = 0 AND idbooks_taken = ?;";

        db.query(fineQuery, [idbooks_taken], (error, result) => {
            if (error) {
                console.error("Error updating fine amount:", error);
            } else {
                console.log("Fine amount updated successfully");
            }
        });
    });
} */





  








module.exports = router