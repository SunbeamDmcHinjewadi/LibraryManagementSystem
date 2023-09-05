import axios from 'axios';
import { format } from 'date-fns';
import { createUrl, log } from '../utils/utils';

export async function getBookList() {
  const url = createUrl('/books/all-books');

  try {
    // get the current user's token from session storage
    const user = sessionStorage.getItem('user');
    /* const parsedUser = JSON.parse(user);
    const {idusers} = parsedUser */
    //console.warn(idusers)
    // create a header to send the token
    const header = {
      headers: {
        user,
      },
    };

    // make the API call using the token in the header
    const response = await axios.get(url, header);
    log(response.data);
    return response.data;
  } catch (ex) {
    console.warn('in catch block')
    log(ex);
    return null;
  }
}

export async function issueBook(bookId, selectedDate) {
  const url = createUrl('/transaction/issue-new-book-for-react'); // Update the API endpoint

  try {
    // Access user ID from session storage
    const id = sessionStorage.getItem('idusers');

    const header = {
      headers: {
        'Content-Type': 'application/json',
        id,
      },
    };

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

    // create the request body
    const requestBody = {
      user_id: id,
      book_id: bookId,
      due_date: formattedDate,
    };

    // make the API call using the token in the header and the request body
    const response = await axios.post(url, requestBody, header);
    log(response.data);
    return response.data;
  } catch (error) {
    log('Error issuing book:', error);
    throw error;
  }
}

