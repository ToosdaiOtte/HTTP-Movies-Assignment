import React, { useState } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const MovieForm = props => {
    const [movie, setMovie] = useState(initialMovie);

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
    };

    return (
        <div>
            <h2>Add New Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={movie.title}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='director'
                    placeholder='Director'
                    value={movie.director}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='metascore'
                    placeholder='Metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                />
                <button>Add</button>
            </form>
        </div>
    );
};

export default MovieForm;