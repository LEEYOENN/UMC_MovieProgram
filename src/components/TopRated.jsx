import React from 'react'
import { useEffect, useState } from 'react'
import LoadingSppiner from './LoadingSppiner';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MovieContainer = styled.div`
width: 250px;
margin: 16px;
color: white;
background-color: #343869;
border-radius: 5px;
position: relative; /* Ensures the Overview can be positioned absolutely */
`;
const MovieImg = styled.img`
  max-width: 100%;
  position: relative; /* Ensures the Overview can be positioned absolutely */
  &:hover{
    cursor: pointer;
    opacity:0.7;
  }
`;
const MovieTitle = styled.h4`
  color: white;
  margin-left: 10px;
  &:hover{
    cursor: pointer;
    opacity:0.8;
  }
`;
const MovieRate = styled.h4`
  color: white;
  margin-left: 10px;
`;
const MovieWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 4%
`;
const Overview = styled.span`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 1;

color: white;
padding: 10px;
box-sizing: border-box;
font-size: 15px;
border-radius: 5px;

display: flex;
justify-content: center;
align-items: center;
text-align: center;

transition: opacity 0.3s ease;
pointer-events: none; /* Prevent interactions with the overview */
`;
const Title = styled.h2`
  color: white;
  margin-left: 75%;
  
`;
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/"

function TopRated() {

  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverMovieId, setHoverMovieId] = useState(null);
  const [movieOne, setMovieOne] = useState([]);

  const getMovieDetail = async (id) => {
      const options = {
          method: 'GET',
          headers: {
          accept: 'application/json',
          Authorization: 'Bearer f1c117e96fccad7d5fd48eadb7a04660'
          }
      }

      await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f1c117e96fccad7d5fd48eadb7a04660&language=en-US`, options)
      .then(response => response.json())
      .then(response => setMovieOne(response))            
      .catch(err => console.error(err));
      console.log(movieOne)
      setLoading(false);

  }


  const getMovie = async() => {
      const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer f1c117e96fccad7d5fd48eadb7a04660'
          }
        };
        
      fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=f1c117e96fccad7d5fd48eadb7a04660&language=kr&page=1', options)
      .then(response => response.json())
      .then(response => setMovieList(response.results))
      .catch(err => console.error(err));
      setLoading(false);
  }
  
  useEffect(()=>{ //영화정보를 얻는 함수 실행
      getMovie()
  },[])

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // 선택한 영화의 id를 이용하여 새로운 페이지로 이동
  }

return (    
<>
<Title>Top Rated Movies</Title>
  {loading ? <LoadingSppiner /> : null};
  <MovieWrapper>
    { movieList.map((movie) => {
        return(
          
            <MovieContainer key={movie.id}
              onMouseEnter={ () => {setHoverMovieId(movie.id) ;
                                    getMovieDetail(movie.id);
                                    setIsHover(true);
              }}
              onMouseLeave={ () => {setHoverMovieId(null);
                                   setIsHover(false);}
              }
              >
                <MovieImg src={IMG_BASE_URL + movie.poster_path} 
                  alt="영화포스터" 
                  onClick={() => handleMovieClick(movie.id)}
                />
                {hoverMovieId === movie.id && movieOne ? (<Overview>{movieOne.overview}</Overview>) : null}
                <div className="movie-info">
                    <MovieTitle onClick={() => handleMovieClick(movie.id)}>{movie.title}</MovieTitle>
                    <MovieRate>⭐{movie.vote_average}</MovieRate>
                </div>
            </MovieContainer>
      
        )
    })
    }
  </MovieWrapper>
 </>
)
}

export default TopRated