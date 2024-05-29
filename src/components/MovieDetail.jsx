import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom' ;
import LoadingSppiner from './LoadingSppiner';
import styled from 'styled-components';
import 'normalize.css';
import axios from 'axios'

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

const MovieWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    margin: 100px 20% 0 20%;
`;



const MoviePoster = styled.img`
    max-width: 400px;
    height: auto;
    margin-bottom: 20px;
`;
const MovieInfo = styled.div`
    text-align: center;
    display: flex;
    justify-content = center;
    align-items: center;
    flex-direction: row;
`;
const MovieDetailInfo = styled.div`
    text-align: center;
    display: flex;
    justify-content = center;
    align-items: center;
    flex-direction: column;
    margin-left: 5%;
`;
const Rating = styled.h3`
    font-size: 20px;
    color: white;
`;
const ProfileTitle = styled.h3`
    font-size:25px;
    color: white;
    text-align: center;
    margin: 20% 0 30px 0;
`;
const Overview = styled.span`
    margin: 20px 10% 10% 10%;
    
    color: white;
`;
const Profile = styled.div`
    display : flex;
    flex-direction: column;
 
`;
const CreditWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    
`;
const ProfileName = styled.span`   
    color: white;
`;
const ProfileImg = styled.img`
    max-width: 50px;
    border-radius: 100px;
`;
const MovieTitle = styled.h3`
    color: white;

`;

function MovieDetail() {

    const api_key = 'f1c117e96fccad7d5fd48eadb7a04660';
    const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w45/"
    const {id} = useParams(); // React Router를 통해 동적으로 받아온 영화 id
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [credits, setCredits] = useState([]);
    
        const fetchMovie = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                params: {
                    api_key: api_key,
                    language: 'en-US'
                },
            });
            setCredits(response.data.cast);
        } catch (error) {
            console.log("Something went wrong, please try again.", error);
        }
    }

    const getMovieDetail = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                    api_key: api_key,
                    language: 'en-US'
                }
            });
            setMovie(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect( () => {
        getMovieDetail();
        fetchMovie();
    }, [id]);
    const rate = Math.floor(movie.vote_average)
    
    return (<div >
        <MovieWrapper>
            {loading ? <LoadingSppiner /> : null};    
            {console.log(id+ 'hello')};
            
                <MovieInfo >
                <MoviePoster src={IMG_BASE_URL+movie.poster_path} alt="영화포스터" /> 
                    <MovieDetailInfo>
                        <MovieTitle>{movie.title}</MovieTitle>
                        <Rating>평점 {"⭐".repeat(rate)}</Rating>
                        <Rating>줄거리</Rating>
                        <Rating>개봉일 {movie.release_date}</Rating>
                        {movie.overview ? <Overview>{movie.overview}</Overview> : 
                        <Overview>TMDB에서 제공하는 API에 줄거리 정보가 없습니다.</Overview>}
                     </MovieDetailInfo>   
                </MovieInfo>
          
            
        </MovieWrapper>
        <ProfileTitle>출연진 및 제작진</ProfileTitle>
        <CreditWrapper>
            {credits.map((profile) => (
                <Profile key={profile.id}> 
                    {profile.profile_path ? <ProfileImg src={IMG_BASE_URL + profile.profile_path} alt="img"/> :
                     <ProfileImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s" alt="img"/>}
                    <ProfileName>{profile.name}</ProfileName>
                </Profile>
            ))}
            
        </CreditWrapper>
        </div>
    );
}

export default MovieDetail;

