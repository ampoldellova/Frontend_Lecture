import React, { useState } from 'react'
import Title from './Title';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Nav';
import { Container } from '@mui/material';

const Create = () => {

    const [state, setState] = useState({
        title: '',
        content: '',
        user: '',
        userId: ''
    });

    const navigate = useNavigate()

    const { title, content, user } = state;

    const handleChange = name => event => {
        console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        // axios.post(`${process.env.REACT_APP_API}/posts`, { title, content, user })
        axios.post(`http://127.0.0.1:8000/api/posts`, { title, content, user })
            .then(response => {
                console.log(response)
                setState({ ...state, title: '', content: '', user: '' });
                alert(`Post title ${response.data.title} is created`);
                return navigate("/");
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data.error);
            })
    };

    return (
        <div>
            <Nav />
            <Container>
                <Title name='Create a new post' />
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='text-muted'>Title </label>
                        <input type="text" className='form-control' placeholder='Post Title' required onChange={handleChange('title')} value={title} />
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Content </label>
                        <textarea type="text" className='form-control' placeholder='Write Something...' required onChange={handleChange('content')} value={content} />
                    </div>
                    <div className="form-group">
                        <label className='text-muted'>User </label>
                        <input type="text" className='form-control' placeholder='Your Name' required onChange={handleChange('user')} value={user} />
                    </div>
                    <div>
                        <button className='btn btn-primary' type='submit'>Create</button>
                    </div>
                </form>
            </Container>
        </div>
    )
}

export default Create