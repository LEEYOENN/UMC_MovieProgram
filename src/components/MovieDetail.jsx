import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom' ;
import LoadingSppiner from './LoadingSppiner';
import 'normalize.css';


function MovieDetail() {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";
    const {id} = useParams(); // React Router를 통해 동적으로 받아온 영화 id
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);


    const getMovieDetail = async () => {
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer f1c117e96fccad7d5fd48eadb7a04660'
            }
        }

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f1c117e96fccad7d5fd48eadb7a04660&language=en-US`, options)
        .then(response => response.json())
        .then(response => setMovie(response))            
        .catch(err => console.error(err));
        setLoading(false);

    }

    useEffect( () => {
        getMovieDetail();
    }, [id]);
    const rate = Math.floor(movie.vote_average)
    
    return (
        <>
            {loading ? <LoadingSppiner /> : null};    
            {console.log(id+ 'hello')};
            <div className='movieDetail-wrapper'>
                <img src={IMG_BASE_URL+movie.poster_path} alt="영화포스터" />
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <span>{"⭐".repeat(rate)}</span>

                {movie.overview ? <p>{movie.overview}</p> : 
                <p>TMDB에서 제공하는 API에 줄거리 정보가 없습니다.</p>}
                
                </div>
            </div>
        </>
    );
}

export default MovieDetail;

