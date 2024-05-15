import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'normalize.css'
import axios from 'axios'
const Input = styled.input`
    width: 400px;
    margin-bottom: 30px;
    padding-left: 40px;
    height: 25px;
    padding: 10px 10px 10px 30px;
    border: 1px solid #ccc;
    border-radius: 20px;
`;
const Container = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;    
    max-width: 450px;
    margin: auto;
    padding: 20px;
    flex-wrap: wrap;
`;
const SearchText = styled.h1`
    color: white;
    text-align: center;
    color: white;
`;
const SearchTitle = styled.h2`
    color: white;
    text-align: center;
    color: white;
`;
const TitleBack = styled.div`
    background-color: rgb(0, 0, 0);
    padding-top: 50px;
    padding-bottom:50px;
    margin: 0%;
`;
const SearchBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
    padding-top: 50px;
    padding-bottom: 100%;
    margin: auto;
    background-color: rgb(20, 20, 63)
`;
const SearchBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

`;
const SearchBtn = styled.button`
    padding: 10px;
    height: 35px;
    background-color: pink;
    color: #fff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    margin-left: 10px;
    &:hover {
        background-color: rgb(241, 196, 75);
    }
`;
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w200/"

function Home() {
    const api_key = 'f1c117e96fccad7d5fd48eadb7a04660';
    const discoverEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}`
    const [searchMovie, setSearchMovie] = useState('')
    const [movieList, setMovieList] = useState([]);

    const fetchMovie = async () => {
        try {
            
            const response = await axios.get(searchEndpoint,
                {
                    params: {
                        api_key: api_key,
                        query: searchMovie,
                        include_adult: true,
                        language: 'en-US',
                        page: 1
                    },

                }

            );
            const results = response.data.results;
            setMovieList(results);
        }
        
        catch (error){
            console.log("Somthing got wrong, Please try again", error);
        }
    }
    useEffect( () => {
        fetchMovie()
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovie()
    }
    return (

        <>
        <body className='back'>
            <TitleBack>
            <SearchTitle>환영합니다!</SearchTitle>
            </TitleBack>
            <SearchBox>
                <SearchText>Find Your Movie!🎥🎬</SearchText>
                <SearchBar>
                <form onSubmit={ handleSearch }>
                    <Input type="text"
                        value={searchMovie} 
                        onChange={(e) => {
                            setSearchMovie(e.target.value);
                            console.log(e.target.value)
                        }}
                        >
                    </Input>
                    <SearchBtn type='button'>🔍</SearchBtn>
                </form>
                </SearchBar>
                <div className='app-container'>
                    {movieList.map((movie) => {
                        return(
                        <div className="movie-container" key={movie.id}>
                            {movie.poster_path && <img src={IMG_BASE_URL + movie.poster_path} alt='img' />}
                            <div className="movie-info">
                                <h4>{movie.title}</h4>
                            </div>
                        </div>
                        )
                    })
                    }
                </div>
            </SearchBox>
        </body>
   
        </>
    )
}
export default Home