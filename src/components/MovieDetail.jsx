import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom' ;
import LoadingSppiner from './LoadingSppiner';
import styled from 'styled-components';
import 'normalize.css';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

const MovieDetailWrapper = styled.div`
    display: flex;
    justify-content = center;
    align-items: center;
    flex-direction: column;
`;

const MoviePoster = styled.img`
    max-width: 300px;
    height: auto;
    margin-bottom: 20px;
`;
const MovieInfo = styled.div`
    text-align: center;
`;
const Rating = styled.span`
    font-size: 20px;
    color: white;
`;
const Overview = styled.p`
    margin: 20px 10% 10% 10%;
    
    color: white;
`;

const MovieTitle = styled.h3`
    color: white;

`;

function MovieDetail() {
   
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
        <MovieDetailWrapper>
            {loading ? <LoadingSppiner /> : null};    
            {console.log(id+ 'hello')};
            <div >
                <MovieInfo >
                <MoviePoster src={IMG_BASE_URL+movie.poster_path} alt="영화포스터" /> 
                    <MovieTitle>{movie.title}</MovieTitle>
                    <Rating>{"⭐".repeat(rate)}</Rating>

                {movie.overview ? <Overview>{movie.overview}</Overview> : 
                <Overview>TMDB에서 제공하는 API에 줄거리 정보가 없습니다.</Overview>}
                
                </MovieInfo>
            </div>
        </MovieDetailWrapper>
    );
}

export default MovieDetail;

