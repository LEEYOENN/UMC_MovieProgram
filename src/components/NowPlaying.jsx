import React from 'react'
import { useEffect, useState } from 'react';
import LoadingSppiner from './LoadingSppiner';
import { useNavigate } from 'react-router-dom';
import 'normalize.css'
function NowPlaying() {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/"
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getMovie = async() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer f1c117e96fccad7d5fd48eadb7a04660'
            }
          };
          
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=f1c117e96fccad7d5fd48eadb7a04660&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => setMovieList(response.results))
        .catch(err => console.error(err));
        setLoading(false);
    }
    
    useEffect(()=>{
        getMovie()
    },[])

    const handleOnClick = (movieId) => {
      navigate(`/movie/${movieId}`)
    };

  return (  
    

    <>
    {loading ? <LoadingSppiner /> : null} 
    <div className='app-container'>
    { movieList.map((movie) => {
        return(
      
            <div className="movie-container">
                <img src={IMG_BASE_URL + movie.poster_path} alt="영화포스터" onClick={ () => {handleOnClick(movie.id)}}/>
                <div className="movie-info">
                    <h4 onClick={ () => {handleOnClick(movie.id)}}>{movie.title}</h4>
                    <span>⭐{movie.vote_average}</span>
                </div>
            </div>
      
            )
        })
        }
    </div>
   </>
  )
}

export default NowPlaying;

