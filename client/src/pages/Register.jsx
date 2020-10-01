import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import styled from "styled-components";

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
        <RegisterContainer>
            {isAuth() ? <Redirect to='/' /> : null}
            <ToastContainer />
            <div>
                <div>

                    <h1>Sign Up</h1>
                    <form className="container" onSubmit={handleSubmit}>
                        <div>

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Name"
                                    value={name} onChange={handleChange('name')} />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email"
                                    value={email} onChange={handleChange('email')} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password"
                                    value={password1} onChange={handleChange('password1')} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Confirm Password"
                                    value={password2} onChange={handleChange('password2')} />
                            </div>
         
                            <button type="submit" className="btn btn-primary">Submit</button>

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
                            <a href="/login">Sign In</a>
                        </div>
                    </form>
                </div>
            </div>
            <Link to='/'>Cancel</Link>

        </RegisterContainer>
    )
}

export default Register

const RegisterContainer = styled.div`

    margin : 0 auto;
    padding: 4rem;
    width  : 31.25rem;

`