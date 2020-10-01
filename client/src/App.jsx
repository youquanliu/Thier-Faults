import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./assets/style/bootstrap.min.css";
class App extends React.Component {

  state = {
    posts: []
  }

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    const res = await axios.get("http://localhost:5000");
    console.log(res.data);
    this.setState({
      posts: res.data
    })
  }
  renderList = () => {
    return this.state.posts.map(post => {
      return (
        <div>
          <h3>{post.name}</h3>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar />
        <Footer />
        <div>
          {this.renderList()}
        </div>
      </div>



    );
  }
}

export default App;
