import React, { useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AddPost = () => {

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
            axios.post(`http://localhost:5000/add-post`, {
                name, image, description,
            }).then(res => {
                setFormData({
                    ...formData,
                    name: '',
                    image: '',
                    description: '',
                });
                toast.success(res.data.message);
                toast.success("Post successfully!");
            }).catch(err => {
                toast.error(err.response.data.error);
            })
        } else {
            toast.error('Please fill all fields');
        }
    }

    return (

        <AddPostContainer>
            <ToastContainer />
            <form className="container" onSubmit={handleSubmit}>
                <h1>Add New Post</h1>
                <div className="form-group">
                    <label className="col-form-label" htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder="Post Name"
                        value={name} onChange={handleChange('name')} />
                </div>
                <div className="form-group">
                    <label className="col-form-label" htmlFor="image">Image</label>
                    <input type="text" className="form-control" placeholder="image url link"
                        value={image} onChange={handleChange('image')} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">You story about this meal</label>
                    <textarea className="form-control" placeholder="description" rows="3" spellCheck="false"
                        value={description} onChange={handleChange('description')}></textarea>
                </div>
                {/* <div className="form-group">
      <label htmlFor="exampleInputFile">File input</label>
      <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
      <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text htmlFor the above input. It's a bit lighter and easily wraps to a new line.</small>
    </div> */}
                <button type="submit" className="btn btn-primary">Post it</button>

            </form>
        </AddPostContainer>
    )
}

export default AddPost

const AddPostContainer = styled.div`

    margin : 3rem auto;
    padding: 4rem;
    width  : 31.25rem;

`