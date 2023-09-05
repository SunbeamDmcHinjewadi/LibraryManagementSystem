import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getBookTransaction, returnBook,deleteTransaction } from '../services/transactions';
import { toast } from 'react-toastify';

function Transaction() {
    const [transaction, setTransactions] = useState([]);
    const [returnedBooks, setReturnedBooks] = useState([]);
    

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const response = await getBookTransaction();
            if (response['status'] === 'success') {
                setTransactions(response['data']);
            } else {
                toast.error('Error while calling get /transaction api');
            }
        } catch (error) {
            console.error('Error loading transactions:', error);
            toast.error('An error occurred while loading transactions.');
        }
    };

    const handleReturnBook = async (takenBookId, book_id) => {
    try {
      const response = await returnBook(takenBookId, book_id);
      if (response['status'] === 'success') {
        const updatedTransaction = await getBookTransaction();

        setTransactions(updatedTransaction['data']);
            setReturnedBooks(prevReturnedBooks => [...prevReturnedBooks, takenBookId]);

        toast.success('Book Returned successfully');
      } else {
        toast.error('Error while returning the book');
      }
    } catch (error) {
      console.error('Error returning the book:', error);
      toast.error('An error occurred while returning the book.');
    }
    console.log('Returned Books:', returnedBooks); // Add this line
    loadTransactions();

  };


  const handleDeleteTransaction = async (takenBookId,book_id) => {
    try {
        const response = await deleteTransaction(takenBookId, book_id);
        if (response['status'] === 'success') {
            loadTransactions();

            // Update the transaction state after successful deletion
            setTransactions(updatedTransactions => updatedTransactions.filter(item => item.idbooks_taken !== takenBookId));

            toast.success('Transaction Deleted successfully');
        } else {
            toast.error('Error while deleting the transaction');
        }
    } catch (error) {
        console.error('Error deleting the transaction:', error);
        toast.error('An error occurred while deleting the transaction.');
    }
  };

  return (
    <div>
        <h4 style={{ textAlign: 'left', margin: 20 }}>All Issued Books</h4>
        {transaction.length == 0 && (
    <div style={{ textAlign: 'center' }}>
      <h5>
        Sorry!! You haven't issued book yet at the moment. Please issue book first.
      </h5>
      <Link to='/Library-gallery'>Browse Books</Link>
    </div>
  )}
        <div className='row' style={{ marginTop: 30 }}>
        {transaction.map((issued_books, index) => (
            <div key={issued_books.idbooks_taken} className='col-md-4'>
                <div className='card'>
                    <div className='card-body'>
                        <p className='card-text' style={{ marginTop: 10 }}>
                            Book Title: {issued_books.book_name}
                        </p>
                        <p className='card-text'>Due Date: {issued_books.due_date}</p>
                        <p className='card-text'>
                            Fine Amount: {returnedBooks.includes(issued_books.idbooks_taken)
                                ? issued_books.fine_amount
                                : issued_books.fine_amount}
                        </p>
                        {returnedBooks.includes(issued_books.idbooks_taken) ? (
                            <div>
                                <p className='card-text'>Book Returned</p>
                                <button
                                    onClick={() => handleDeleteTransaction(issued_books.idbooks_taken, issued_books.book_id)}
                                    className='btn btn-danger'
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() =>
                                    handleReturnBook(issued_books.idbooks_taken, issued_books.book_id)
                                }
                                className='btn btn-primary'
                                disabled={issued_books.returned_date !== null}
                            >
                                {issued_books.returned_date !== null ? 'Returned' : 'Return-Book'}
                            </button>
                        )}
                    </div>
                </div>
                {index !== transaction.length - 1 && <div style={{ margin: '20px 0' }}></div>}
            </div>
        ))}
        </div>
    </div>
);
}

export default Transaction;
