import React from 'react'
import styled from 'styled-components';
import Spinner from "../../../resource/Rolling@1x-1.0s-200px-200px.gif"
const LoadingText = styled.h2`
    font-size: 50px;
    text-align: center;
`;
const Loadingwrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:#22254b;
`;

function LoadingSppiner() {
  return (
    <Loadingwrapper>
        <LoadingText>Loading...</LoadingText>
        <img src={Spinner} alt="로딩스피너" />
    </Loadingwrapper>
  )
}

export default LoadingSppiner