import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './Screens/Register';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <App{...props} />} />
      <Route path="/register" exact render={props => <Register{...props} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

