import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Posts from './components/Posts/Posts';
import { Route } from "react-router-dom";
import "./assets/style/bootstrap.min.css";


function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
    return () => {
    }
  }, []);

  return (
    <div>
      <Header />
   
      <Route exact path='/' render={() => <Posts posts={posts} />} />
      <Footer />
    </div>
  );

}

export default App;
