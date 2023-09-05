import axios from 'axios';
import { createUrl, log } from '../utils/utils';

export async function getBookTransaction() {
    const user = sessionStorage.getItem('idusers');
    const url = createUrl('/transaction/transaction-per-book/'+user);
    console.log(url)
    try {
      // get the current user's token from session storage

      /* const parsedUser = JSON.parse(user);
      const {idusers} = parsedUser */
      //console.warn(idusers)
      // create a header to send the token
      const header = {
        headers: {
        'Content-Type': 'application/json',
          user,
        },
      };
      
      // make the API call using the token in the header
      const response = await axios.get(url, header);
      log(response.data);
      console.log(response.data)
      return response.data;
    } catch (ex) {
      console.warn('in catch block')
      log(ex);
      return null;
    }
  }


export async function returnBook(takenBookId,book_id)
{
  const user = sessionStorage.getItem('idusers');
    const url = createUrl('/transaction/return-book-date/'+takenBookId+'/'+user+'/'+book_id);
    try {
      // get the current user's token from session storage

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
      const response = await axios.put(url, header);
      log(response.data);
      console.log(response.data)
      return response.data;
    } catch (ex) {
      console.warn('in catch block')
      log(ex);
      return null;
    }
    
}



export async function deleteTransaction(takenBookId,book_id)
{
  const user = sessionStorage.getItem('idusers');
    const url = createUrl('/transaction/return-book-delete/'+takenBookId+'/'+user+'/'+book_id);
    try {
      // get the current user's token from session storage

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
      const response = await axios.delete(url, header);
      log(response.data);
      console.log(response.data)
      return response.data;
    } catch (ex) {
      console.warn('in catch block')
      log(ex);
      return null;
    }
}
