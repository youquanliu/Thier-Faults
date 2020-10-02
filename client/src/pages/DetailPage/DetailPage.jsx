import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './DetailPage.css';

const DetailPage = (props) => {

    const [post, setPost] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/${props.match.params.id}`)
            .then(res => setPost(res.data))
            .catch(err => console.log(err))
    }, []);

    const deletePost = () => {
        axios.delete(`http://localhost:5000/${props.match.params.id}`, post)
            .catch(err => console.log(err))
            .then(() => toast.success('Deleted!'))
    }

    return (
        <div>
            <ToastContainer />
            <div className="card">
                <h1> {post.name}</h1>
                <div className="fakeimg"><img src={post.image} alt="{{post.name}}" /></div>
                <p>{post.description}</p>
                {console.log(post)}<br />
                <div className="bt-group">
                    <Link to={`/update/${props.match.params.id}`} type="submit" className="btn btn-secondary button">
                        EDIT
            </Link>

                    <Link onClick={deletePost} to={'/'} type="submit" className="btn btn-danger button">
                        DELETE
            </Link>
                    <Link to={'/'} type="submit" className="btn btn-primary button">
                        Back to home
            </Link>
                </div>
            </div>


            {typeof (post) == null ? < Redirect to='/' /> : null}

        </div>
    )
}

export default DetailPage
