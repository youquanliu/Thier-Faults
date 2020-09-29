import React from 'react';
import axios from 'axios';

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
        <div className="App">
          App main page
      </div>

        <div>
          {this.renderList()}
        </div>
      </div>



    );
  }
}

export default App;
