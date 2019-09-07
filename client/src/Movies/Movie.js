import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statement } from '@babel/template';

const Movie = (props) => {

  const [movie, setMovie] = useState(undefined);
  //  Fix suggested in Slack set state to undefined 
  // and wrap return below in if statement. 

  useEffect(() => {

    const id = props.match.params.id;

    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [props.match.params.id]);

  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = () => {
  //   const addToSavedList = props.addToSavedList;
  //   addToSavedList(movie)
  // }


  // console.log("Moviejs", props)
  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  // Suggested fix to workaround map issue (If statement)
  if (movie !== undefined) {
    return (
      <div className="save-wrapper">
        <div className="movie-card">
          <h2>{title}</h2>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>

          {stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
        </div>
        <div className="save-button">Save</div>
      </div>
    );
  }
}

export default Movie;