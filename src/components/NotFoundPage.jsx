import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:#22254b;
`;
const NotFoundText = styled.h2`
    font-size: 50px;
    text-align: center;
    color: white;
`;

const NotFoundText2 = styled.h4`
    font-size: 30px;
    text-align: center;
    color: white;
`; 
function NotFoundPage() {
  const navigate = useNavigate();
const handleMovieClick = () => {  
  navigate(-1);
}

  return (
    
    <MessageWrapper className='flex flex-col gap-2'>
        <NotFoundText>
          Oops!<br></br>예상치 못한 에러가 발생했습니다.🥲<br></br>
        </NotFoundText>
        <NotFoundText2 onClick={handleMovieClick}>
          이전 페이지로 돌아가기
        </NotFoundText2>
        
        
    </MessageWrapper>
  )
}

export default NotFoundPage