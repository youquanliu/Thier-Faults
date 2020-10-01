import React from 'react';
import './Posts.css';
import spinner from '../../assets/images/donut-spinner.gif';
import EachPost from '../../components/EachPost';

const Posts = ({ posts }) => {

    const ToDetailPage = (post) => {
        window.location.pathname = `/${post._id}`;
    }

    return (
        <div className="post">
            {
                // Spinner while page loading
                !posts.length ? <img className="spinner" src={spinner} alt="loading..." />
                    :
                    posts.map((post, key) => (
                        <div className="posts-container" key={post.name}>
                            <div className="itemBox">
                                <img src={post.image}></img>
                                <div className="contentBx">
                                    <p>{post.name}</p><br />

                                    <button className="btn btn-secondary btn-sm"
                                        onClick={() => { ToDetailPage(post) }}
                                    >Detail</button>

                                </div>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
};

export default Posts
