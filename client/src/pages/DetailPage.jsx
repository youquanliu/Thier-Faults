import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailPage = (props) => {


    const [post, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/${props.match.params.id}`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
        return () => {
        }
    }, []);

    return (
        <div>
            <h1>
                {post.name}
            </h1>
            <img src={post.image} alt="{{post.name}}" />
            <p>{post.description}</p>
            {console.log(post)}
        </div>
    )
}

export default DetailPage
