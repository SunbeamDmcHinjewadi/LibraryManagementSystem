import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { getBookList, issueBook } from '../services/books';
import { getBookTransaction } from '../services/transactions';
import { constants } from '../utils/constants';

function BooksGallery() {
  const [books, setBooks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [showMoreStates, setShowMoreStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadBooks();
    loadIssuedBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await getBookList();
      if (response['status'] === 'success') {
        setBooks(response['data']);
        setShowMoreStates(new Array(response['data'].length).fill(false));
      } else {
        toast.error('Error while calling get /book api');
      }
    } catch (error) {
      console.error('Error loading books:', error);
      toast.error('An error occurred while loading books.');
    }
  };

  const loadIssuedBooks = async () => {
    try {
      const issuedResponse = await getBookTransaction();
      if (issuedResponse['status'] === 'success') {
        setIssuedBooks(issuedResponse['data']);
      } else {
        toast.error('Error while calling get /issued-books api');
      }
    } catch (error) {
      console.error('Error loading issued books:', error);
      toast.error('An error occurred while loading issued books.');
    }
  };

  const handleIssueBook = async (bookId) => {
    try {
      if (!selectedDate) {
        toast.error('Please select a due date');
        return;
      }

      const alreadyIssued = issuedBooks.some(
        (issuedBook) => issuedBook.book_id === bookId
      );
      if (alreadyIssued) {
        toast.warning('This book is already issued.');
        return;
      }

      const response = await issueBook(bookId, selectedDate);
      if (response['status'] === 'success') {
        toast.success('Book issued successfully');
      } else {
        toast.error('Error issuing the book');
      }
    } catch (error) {
      console.error('Error issuing the book:', error);
      toast.error('An error occurred while issuing the book.');
    }
    loadIssuedBooks();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Book Gallery</h1>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search by book name...'
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className='row' style={{ marginTop: 50 }}>
        {books
          .filter((book) =>
            book.booksName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((book, index) => (
            <div key={book.idBooks} className='col-md-4 book-container' style={{ marginTop: 50 }}>
              <div className='card'>
                <div className='card-body'>
                  <img
                    src={constants.serverUrl + '/' + book['bookImg']}
                    style={{ height: 200 }}
                    alt=''
                  />
                  <p className='card-text' style={{ marginTop: 20 }}>
                    Name: {book.booksName}
                  </p>
                  <p className='card-text'>Written By: {book.bookAuthor}</p>
                  <p className='card-text'>Category: {book.categoryName}</p>
                  {showMoreStates[index] && (
                    <React.Fragment>
                      <p className='card-text'>Price: ₹{book.bookPrice}</p>
                      <p className='card-text'>Description: {book.bookDesc}</p>
                      <p className='card-text'>
                        Available Copies: {book.available_copies}
                      </p>
                    </React.Fragment>
                  )}
                  {showMoreStates[index] && (
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      placeholderText='Select due date'
                      className='form-control'
                    />
                  )}
                  <div className='d-flex align-items-center justify-content-between'>
                    {showMoreStates[index] && (
                      <button
                        onClick={() => handleIssueBook(book.idBooks)}
                        className='btn btn-primary'
                        disabled={issuedBooks.some(
                          (issuedBook) => issuedBook.book_id === book.idBooks
                        )}
                        title={
                          issuedBooks.some(
                            (issuedBook) =>
                              issuedBook.book_id === book.idBooks
                          )
                            ? 'This book is already issued'
                            : undefined
                        }
                      >
                        Issue-Book
                      </button>
                    )}
                    <button
                      className='btn btn-link'
                      onClick={() => {
                        const newShowMoreStates = [...showMoreStates];
                        newShowMoreStates[index] = !newShowMoreStates[index];
                        setShowMoreStates(newShowMoreStates);
                      }}
                    >
                      {showMoreStates[index] ? 'Hide' : 'Show More'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BooksGallery;
