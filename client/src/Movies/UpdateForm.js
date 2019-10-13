import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = props => {

    const [movie, setMovie] = useState(initialMovie);
    const {history, location} = props;
    console.log('Update Form props', props);

    useEffect(() => {
        if(location.state !== undefined){
            setMovie(location.state);
        }
    }, [location]);

    const handleChange = e => {
        e.persist();
        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                setMovie(res.data)
                history.push('/');
            })
            .catch(err => console.log('Ahhh BUG', err));
    };

    return (
        <div className='form-container'>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={movie.title}
                    onChange={handleChange}
                /><br />
                <input 
                    type='text'
                    name='director'
                    placeholder='Director'
                    value={movie.director}
                    onChange={handleChange}
                /><br />
                <input
                    type='number'
                    name='metascore'
                    placeholder='Metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                /><br />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm;