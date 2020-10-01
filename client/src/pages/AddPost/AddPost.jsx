import React, { useState } from 'react';
import './AddPost.css';

const AddPost = () => {

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
    })
    const { name, image, description } = formData

    const handleChange = text => e => {
        console.log(name, image, description);
        setFormData({ ...formData, [text]: e.target.value });
    }
    return (

        <form className="container">
            <h1>Add New Post</h1>
            <div className="form-group">
                <label className="col-form-label" htmlFor="name">Name</label>
                <input type="text" className="form-control" placeholder="Post Name"
                    onChange={handleChange('name')} />
            </div>
            <div className="form-group">
                <label className="col-form-label" htmlFor="image">Image</label>
                <input type="text" className="form-control" placeholder="image url link"
                    onChange={handleChange('image')} />
            </div>

            <div className="form-group">
                <label htmlFor="description">You story about this meal</label>
                <textarea className="form-control" placeholder="description" rows="3" spellCheck="false"
                    onChange={handleChange('description')}></textarea>
            </div>
            {/* <div className="form-group">
      <label htmlFor="exampleInputFile">File input</label>
      <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
      <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text htmlFor the above input. It's a bit lighter and easily wraps to a new line.</small>
    </div> */}
            <button type="submit" className="btn btn-primary">Post it</button>

        </form>

    )
}

export default AddPost
