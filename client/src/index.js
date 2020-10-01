import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Register from './pages/Register.jsx';
import Activate from './pages/Activate.jsx';
import Login from './pages/Login.jsx';
import AddPost from './pages/AddPost/AddPost';
import DetailPage from './pages/DetailPage';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>

      <Route path='/' exact render={props => <App{...props} />} />
      <Route path='/register' exact render={props => <Register {...props} />} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <Route exact path='/add-post' render={props => <AddPost {...props} />} />
      <Route exact path='/:id' render={props => <DetailPage {...props} />} />

    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

