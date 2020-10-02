import React from 'react';
import './Posts.css';
import spinner from '../../assets/images/donut-spinner.gif';

const Posts = ({ posts }) => {
    const ToDetailPage = (post) => {
        window.location.pathname = `/${post._id}`;
    }

    return (
        <div className="post">

            <div class="jumbotron jumbotron-m">
                <h1 class="display-8">Welcome to Their Faults</h1>
                <p> We all eat food that we know we should not be eating.
                     But they tastes so good! This will be an opportunity to 
                     post about all the food you feel guilty about, but actually 
                     tastes delicious and may lead you to gaining weight. You
                     could even phrase these as fake obituaries.
                </p>
                <hr class="my-4" />

            </div>

            <div className="posts-container" >
                {
                    // Spinner while page loading
                    !posts.length ? <img className="spinner" src={spinner} alt="loading..." />
                        :
                        posts.map((post, key) => (
                            <div className="itemBox" key={post.name}>
                                <img src={post.image}></img>
                                <div className="contentBx">
                                    <p>{post.name}</p><br />
                                    <button className="btn btn-secondary btn-sm"
                                        onClick={() => { ToDetailPage(post) }}
                                    >Detail</button>
                                </div>
                            </div>
                        )
                        )
                }
            </div>
        </div>
    );
};

export default Posts
