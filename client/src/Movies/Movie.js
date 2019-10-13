import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));      
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        this.setState({movie: res.data})
        this.props.history.push('/')
        console.log(this.state)
      })
      .catch(err => console.log('Ahhh BUG', err));
  };

  render() {
    console.log('Movie props:', this.props, this.state.movie)
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
  console.log('Movie State', this.state.movie)
    return (
      
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className='update-button'>
        <Link to={{
          pathname: `/update-movie/${this.state.movie.id}`,
          state: this.state.movie
          }}
        >  
          Update
        </Link>
        </div>
        <div className='delete-button' onClick={this.deleteMovie}>
          Delete
        </div>
      </div>
    );
  }
}
