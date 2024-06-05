import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Container = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;    
    max-width: 450px;
    margin: auto;
    padding: 20px;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        max-width: 90%;
        padding: 10px;
    }
`;
const Title = styled.h2`
    margin-top: 60px;
    margin-bottom: 40px;
    text-align: center;
    color: white;

    @media (max-width: 600px){
        margin-top: 40px;
        margin-bottom: 30px;
        font-size:1.5em;
    }
`;
const Error = styled.p`
    font-size: 12px;
    color: red;
    margin-top:-10px; 
    margin-bottom: 20px;

    @media (max-width: 600px) {
        font-size: 10px;
    }
`;
const Button = styled.button`
    width: 80%;
    padding: 10px;
    height: 50px;
    background-color: #007b0f;
    color: #fff;
    border: none;
    border-radius: 8px;
    margin-left: 40px;
    cursor: pointer;
    &:hover {
        background-color: #005603;
    }

    @media (max-width: 600px) {
        width:90%;
        height: 40px;
        margin-left: 0;
        font-size: 0.9em;
    }
`;
const Input = styled.input`
    width: 400px;
    margin-bottom: 30px;
    padding-left: 40px;
    height: 25px;
    padding: 10px 10px 10px 30px;
    border: 1px solid #ccc;
    border-radius: 20px;

    @media (max-width: 600px) {
        width: 90%;
        padding-left: 20px;
        height: 20px;
        margin-bottom: 20px;
    }
`;
const schema = yup.object().shape({
    userid: yup
        .string()
        .required("아이디를 입력해 주세요."),
    password: yup
        .string()
        .min(4, "비밀번호는 최소 4자리 이상이어야 합니다.")
        .max(12, "비밀번호는 최대 12자리까지 가능합니다.")
        .test(
            'strong-password',
            '비밀번호는 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
            value => {
                if (!value)
                    return false;
                const upperCaseValid = /[A-Z]/.test(value);
                const lowerCaseValid = /[a-z]/.test(value);
                const numberValid = /[0-9]/.test(value);
                const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                return upperCaseValid && lowerCaseValid && numberValid && specialCharValid;
            }
        )
        .required("비밀번호를 입력해주세요.")
});
function Login() {
    const { register, handleSubmit, formState:  { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = async data => {
        //const response = await axios.post('http://localhost:8080/auth/signup', data);
        console.log(data);
    }

  return (
    <Container>
        <Title>로그인 페이지</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="text" placeholder="아이디"
                { ...register('userid') }
            />
            { errors.userid && <Error>{errors.userid.message}</Error>}
            <Input
                type='password' placeholder="비밀번호" 
                { ...register('password') }
            />
            { errors.password && <Error>{errors.password.message}</Error>}
            <Button type='submit'>로그인</Button>
        </form>
    </Container>
  )
}

export default Login