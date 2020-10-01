import React from 'react';
import './Posts.css';
import spinner from '../../assets/images/donut-spinner.gif';
const Posts = ({ posts }) => {
    return (
        <div className="post">

            {
                // Spinner while page loading
                !posts.length ? <img className="spinner" src={spinner} alt="loading..." />
                :
                posts && posts.map((post, key) => (
                    <div className="posts-container">
                        <div className="itemBox">
                            <img src={post.image}></img>
                            <div className="contentBx">
                                <p>{post.name}</p><br />
                                <button className="btn btn-secondary btn-sm">Edit</button>
                            </div>
                        </div>
                    </div>
                ))

            }

        </div>

    );
};

export default Posts
