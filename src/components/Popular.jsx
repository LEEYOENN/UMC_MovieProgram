import React, { useEffect, useState } from 'react';
import LoadingSppiner from './LoadingSppiner';
import 'normalize.css';
import { useNavigate } from 'react-router-dom';

function Popular() {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const api_key = 'f1c117e96fccad7d5fd48eadb7a04660';
    const navigate = useNavigate();
   
    const getMovie = async (page = 1) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${api_key}`
            }
        };
        setLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=kr&page=${page}`, options);
            const data = await response.json();
            setMovieList(data.results);
            setTotalPages(data.total_pages);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };
    
    const handleOnClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };
    
    useEffect(() => {
        getMovie(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (  
        <>
            {loading ? <LoadingSppiner /> : null} 
            <div className='app-container'>
                {movieList.map((movie) => (
                    <div className="movie-container" key={movie.id}>
                        <img src={IMG_BASE_URL + movie.poster_path} alt="영화포스터" 
                            onClick={() => handleOnClick(movie.id)}
                        />
                        <div className="movie-info">
                            <h4 onClick={() => handleOnClick(movie.id)}>{movie.title}</h4>
                            <span>⭐{movie.vote_average}</span>
                        </div>
                    </div>
                ))}
            </div>
    
            <div className='pagination'>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{ backgroundColor: currentPage === 1 ? 'grey' : 'blue' }}
                >
                    Previous
                </button>

                <span>Page {currentPage} of {totalPages}</span>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{ backgroundColor: currentPage === totalPages ? 'grey' : 'blue' }}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Popular;