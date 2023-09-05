import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout,selectUser,login  } from '../features/authSlice';

function NavigationBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // logout the user
  const logoutUser = () => {
    // Clear the session storage changes
    sessionStorage.removeItem('idusers');
    sessionStorage.removeItem('uName');
    sessionStorage.removeItem('uEmail');
    sessionStorage.removeItem('uContact');
    sessionStorage.removeItem('uCreatedAt');


    // Hide the navigation bar
    dispatch(logout());

    // Redirect to login page
    navigate('/');
  };

  useEffect(() => {
    // Check if the user is logged in on initial load
    const idusers = sessionStorage.getItem('idusers');
    if (idusers) {
      // Dispatch action to set the user state
      dispatch(login({ idusers })); // Modify this based on your action implementation
    }
  }, []);

  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <a className='navbar-brand'>Nalanda Library</a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='flex items-center gap-1 bg-white p-1 rounded' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='ri-logout-box-r-line ml-2'>
                <Link className='nav-link' to='/Library-gallery'>
                  Books
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/Transactions'>
                  Issued-Book-Section
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/Profile'>
                  Profile
                </Link>
              </li>
            </ul>
          </div>
            
                      

          <div className='d-flex'>
          {user ? (
            <button onClick={logoutUser} className='btn'>
              Logout
            </button>
          ) : (
            <Link to='/'>Login</Link>
          )}
        </div>
          
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
