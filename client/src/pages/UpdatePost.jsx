import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const UpdatePost = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
    })
    const { name, image, description } = formData

    const handleChange = text => e => {
        // console.log(name, image, description);
        setFormData({ ...formData, [text]: e.target.value });
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (name && image && description) {
            axios.put(`http://localhost:5000/update/${props.match.params.id}`, {
                name, image, description,
            }).then(res => {
                setFormData({
                    ...formData,
                    name: '',
                    image: '',
                    description: '',
                });
                toast.success(res.data.message);
                toast.success("Update successfully!");
            }).catch(err => {
                toast.error(err.response.data.error);
            })
        } else {
            toast.error('Please fill all fields');
        }
    }

    return (

        <UpdatePostContainer>
            <ToastContainer />
            <form className="container" onSubmit={handleSubmit}>
                <h1>Edit Post</h1>
                <div className="form-group">
                    <label className="col-form-label" htmlFor="name">Title</label>
                    <input type="text" className="form-control" placeholder="Post Name"
                        value={name} onChange={handleChange('name')} />
                </div>
                <div className="form-group">
                    <label className="col-form-label" htmlFor="image">Image</label>
                    <input type="text" className="form-control" placeholder="Image Url Link"
                        value={image} onChange={handleChange('image')} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">You story about this meal</label>
                    <textarea className="form-control" placeholder="Description" rows="3" spellCheck="false"
                        value={description} onChange={handleChange('description')}></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Update it</button>

            </form>

        </UpdatePostContainer>
    )
}

export default UpdatePost

const UpdatePostContainer = styled.div`

    margin : 3rem auto;
    padding: 4rem;
    width  : 31.25rem;

`