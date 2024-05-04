import React from 'react'
import { useState, useEffect } from 'react'
function UpComing() {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/"
    const [movieList, setMovieList] = useState([]);
  
  
    const getMovie = async() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer f1c117e96fccad7d5fd48eadb7a04660'
            }
          };
          
          fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=f1c117e96fccad7d5fd48eadb7a04660&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => setMovieList(response.results))
        .catch(err => console.error(err));
    }
    
    useEffect(()=>{
        getMovie()
    },[])
  
  return (  
  <div className='app-container'>
    { movieList.map((movie) => {
        return(
      
            <div className="movie-container">
                <img src={IMG_BASE_URL + movie.poster_path} alt="영화포스터" />
                <div className="movie-info">
                    <h4>{movie.title}</h4>
                    <span>{movie.vote_average}</span>
                </div>
            </div>
      
        )
    })
    }
    
   </div>
  )
  }
export default UpComing