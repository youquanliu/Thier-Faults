import React from 'react';
// import PostPage from '../pages/PostPage';

const EachPost = (props) => {

    const ToDetailPage = () => {
        window.location.pathname = `${props.post._id}`;
    }

    return (
        <div>
            <button onClick={ToDetailPage}>
                <h3>{props.post.name}</h3>
            </button>
        </div>
    )
}

export default EachPost