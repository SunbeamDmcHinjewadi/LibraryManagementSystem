import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function registerUser(
    uName,
    uEmail,
    uContact,
    uPassword,
) {
  const url = createUrl('/users/register')
  const body = {
    uName,
    uEmail,
    uContact,
    uPassword,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function loginUser(uEmail, uPassword) {
  const url = createUrl('/users/login/patron')
  const body = {
    uEmail,
    uPassword,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function getUserDetails() {

  const user = sessionStorage.getItem('idusers');
  const url = createUrl('/users/get-user/'+user);

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


export async function editUserDetails(userData)
{
  const user = sessionStorage.getItem('idusers');
  const url = createUrl('/users/get-user/'+user);


  try {
    const response = await axios.put(url, userData);
    return response.data;
} catch (error) {
    throw error;
}
}