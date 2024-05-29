import React, { useEffect, useState, useCallback } from 'react';
import LoadingSppiner from './LoadingSppiner';
import { useNavigate } from 'react-router-dom';
import 'normalize.css';

function NowPlaying() {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Track the current page
    const [hasMore, setHasMore] = useState(true); // Track if there are more movies to load
    const navigate = useNavigate();

    const getMovie = async (page) => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer f1c117e96fccad7d5fd48eadb7a04660'
            }
          };
          
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=f1c117e96fccad7d5fd48eadb7a04660&language=en-US&page=${page}`, options)
        .then(response => response.json())
        .then(response => {
            setMovieList(prevMovies => [...prevMovies, ...response.results]);
            setHasMore(response.page < response.total_pages); // Check if there are more pages
            setLoading(false);
        })
        .catch(err => console.error(err));
    };
    
    useEffect(() => {
        getMovie(page);
    }, [page]);

    const handleOnClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight && hasMore) {
            setPage(prevPage => prevPage + 1);
            setLoading(true);
        }
    }, [hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        setLoading(false);
        return () => window.removeEventListener('scroll', handleScroll);
        
    }, [handleScroll]);

    return (  
        <>
        {loading && <LoadingSppiner />} 
        <div className='app-container'>
            {movieList.map((movie) => {
                return (
                    <div className="movie-container" key={movie.id}>
                        <img src={IMG_BASE_URL + movie.poster_path} alt="영화포스터" onClick={() => handleOnClick(movie.id)} />
                        <div className="movie-info">
                            <h4 onClick={() => handleOnClick(movie.id)}>{movie.title}</h4>
                            <span>⭐{movie.vote_average}</span>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    );
}

export default NowPlaying;
