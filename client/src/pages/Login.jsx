import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import styled from "styled-components";

const Login = ({ history }) => {

    const [formData, setFormData] = useState({
        email: '',
        password1: '',
    });
    const { email, password1 } = formData;
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

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

    const handleSubmit = e => {
        console.log(process.env.REACT_APP_API_URL);
        e.preventDefault();
        if (email && password1) {
            setFormData({ ...formData, textChange: 'Submitting' });
            axios
                .post(`${process.env.REACT_APP_API_URL}/login`, {
                    email,
                    password: password1
                })
                .then(res => {
                    authenticate(res, () => {
                        setFormData({
                            ...formData,
                            email: '',
                            password1: '',
                            textChange: 'Submitted'
                        });

                        console.log(res.data);
                        toast.success('Sign In Successfully!')

                        isAuth() && isAuth().role === 'admin'
                            ? history.push('/admin')
                            : history.push('/private');
                        toast.success(`Hey ${res.data.user.name}, Welcome back!`);
                    });
                })
                .catch(err => {
                    setFormData({
                        ...formData,
                        email: '',
                        password1: '',
                        textChange: 'Sign In'
                    });
                    console.log(err.response);
                    toast.error(err.response.data.errors);
                });
        } else {
            toast.error('Please fill all fields');
        }
    };

    return (
        <LoginContainer>

            {isAuth() ? <Redirect to='/' /> : null}
            <ToastContainer />
            <h1>Sign In</h1>

            <form className="container" onSubmit={handleSubmit} >

                <div className="form-group">
                    <label className="col-form-label" htmlFor="email">Email</label>
                    <input type="email" className="form-control" placeholder="Email to log in"
                        value={email} onChange={handleChange('email')} />
                </div>
                <div className="form-group">
                    <label className="col-form-label" htmlFor="password">Password</label>
                    <input type="password" className="form-control" placeholder="password"
                        value={password1} onChange={handleChange('password1')} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

                <Link to='/register'>
                    Forget password?
                </Link>
            </form>

            <a href='/register' target='_self'>
                <span>Sign Up</span>
            </a>
            <br />
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
                        <span>Sign In with Google</span>
                    </button>
                )}
            ></GoogleLogin>
            <br />
            <Link to='/'>Cancel</Link>
        </LoginContainer>
    )
}
export default Login;

const LoginContainer = styled.div`

    margin : 3rem auto;
    padding: 4rem;
    width  : 31.25rem;

`