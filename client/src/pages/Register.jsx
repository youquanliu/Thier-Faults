import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const Register = ({ history }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
    })
    const { name, email, password1, password2 } = formData


    //send Google token
    const sendGoogleToken = tokenId => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
                idToken: tokenId
            })
            .then(res => {
                console.log(res.data);
                informParent(res);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
                toast.error('GOOGLE SIGNIN ERROR');
            });
    };

    //Authenticate user and redirect
    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin'
                ? history.push('/admin')
                : history.push('/');
        });
    };
    //Get response from google
    const responseGoogle = response => {
        console.log(response);
        sendGoogleToken(response.tokenId);
    };
    
    const handleChange = text => e => {
        // console.log(name, email, password1, password2)
        setFormData({ ...formData, [text]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (name && email && password1) {
            if (password1 === password2) {
                axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                    name, email, password: password1,
                }).then(res => {
                    setFormData({
                        ...formData,
                        name: '',
                        email: '',
                        password1: '',
                        password2: ''
                    });
                    toast.success(res.data.message);
                }).catch(err => {
                    toast.error(err.response.data.error);
                })
            } else {
                toast.error('passwords don\'t maches')
            }
        } else {
            toast.error('Please fill all fields');
        }
    }
    return (
        <div className="">
            {isAuth() ? <Redirect to='/' /> : null}
            <ToastContainer />
            <div>
                <div>
                    <h1>
                        Sign Up for Their Faults
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" placeholder="Name"
                                onChange={handleChange('name')} value={name}
                            />
                            <input type='email' placeholder='Email'
                                onChange={handleChange('email')} value={email}
                            />
                            <input type="password" placeholder='Password'
                                onChange={handleChange('password1')} value={password1}
                            />
                            <input type='password' placeholder='Confirm Password'
                                onChange={handleChange('password2')} value={password2}
                            />
                            <button type='submit'>
                                {/* <span>{textChange}</span> */}
                                REGISTER
                            </button>
                        </div>
                        <GoogleLogin
                            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <div>
                                        <i className='fab fa-google ' />
                                    </div>
                                    <span>OR Sign In with Google</span>
                                </button>
                            )}
                        ></GoogleLogin>

                        <div>
                            Has an account?
                        </div>
                        <div>
                            <a href="/login">Sign In</a>
                        </div>
                    </form>
                </div>
            </div>
            <Link to='/'>Cancel</Link>

        </div>
    )
}

export default Register
