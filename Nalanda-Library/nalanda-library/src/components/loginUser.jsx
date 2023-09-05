import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../features/authSlice';
import '../styles/login.css'
import { loginUser as loginUserApi } from '../services/user';

function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async () => {
    if (!email) {
      toast.error('Please enter email');
    } else if (!password) {
      toast.error('Please enter password');
    } else {
      try {
        const response = await loginUserApi(email, password);

        if (response.status === 'success') {
      
          console.log(response.data)
          const { idusers,uName,uEmail,uContact,uCreatedAt } = response['data']
  
          sessionStorage['idusers'] = idusers
          sessionStorage['uName'] = uName
          sessionStorage['uEmail'] = uEmail
          sessionStorage['uContact'] = uContact
          sessionStorage['uCreatedAt'] = uCreatedAt

          dispatch(login());

          toast.success(`Welcome ${uName} to the NALANDA LIBRARY`);
          
          navigate('/Library-gallery');
        } else {
          toast.error('Invalid email or password');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        toast.error('An error occurred while logging in');
      }
    }
  };

  return (
    <div className="container">
    <h1 className="login-header">Nalanda-Library</h1>

    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card mt-4 login-container">
                <div className="card-body">
                    <div className="mb-3">
                    {/* <div >
                     <label style={{ textAlign: 'center' }}>Login</label>
                      </div> */}
                        <label htmlFor="email" className="form-label white-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label white-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <p className="mb-3 form-label white-label">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                        <button onClick={loginUser} className="btn btn-success">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  );
}

export default LoginUser;
