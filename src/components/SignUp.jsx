import React from 'react'
import styled from 'styled-components'; 
import { useState } from 'react';
import 'normalize.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
        font-size: 1.5em;
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

    @media (max-width: 600px){
        width: 90%;
        padding-left:20px;
        height: 25px;
        margin-bottom: 20px;
    }
`;
const Error = styled.p`
    font-size: 12px;
    color: red;
    margin-top:-10px; 
    margin-bottom: 20px;

    @media (max-width: 600px){
        font-size: 10px;
    }
`;
const NoError = styled.p`
    font-size: 12px;
    color: green;
    margin-top:-10px; 
    margin-bottom: 20px;

    @media (max-width: 600px){
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

    @media (max-width: 600px){
        width: 90%;
        height: 40px;
        margin-left: 0;
        font-size: 0.9em;
    }
    `;
const ToLogin = styled.h4`
    margin-top: 60px;
    margin-bottom: 40px;
    text-align: center;
    color: white;
    &:hover{
        cursor: pointer;
    }
    @media (max-width: 600px){
        margin-top: 40px;
        margin-bottom: 30px;
        font-size: 1em;
    }
`;

const schema = yup.object().shape({
    name: yup.string().required("이름을 입력하세요."),
    username: yup.string().required("아이디를 입력해주세요."),
    email: yup.string().email("이메일 형식에 맞게 입력해주세요.").required("이메일을 입력해주세요."),
    age: yup
        .number()
        .typeError("나이는 숫자여야 합니다.")
        .integer("나이는 정수여야합니다.")
        .min(19, "해당 사이트는 19살 이상만 가입할 수 있습니다.")
        .required("나이를 입력해주세요"),
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
        .required("비밀번호를 입력해주세요."),
    passwordCheck: yup
        .string()
        .oneOf([yup.ref('password'), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호 확인을 입력해주세요.")

});

const SignUp = () => {

    const navigate = useNavigate(); 
     const handleLoginClick = () => {
        navigate("/login")
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', data);
            if (response.status === 201) {
                alert("회원가입이 정상적으로 처리되었습니다.");
                console.log(data);
                navigate("/login");
            } else if (response.status === 409) {
                alert("이미 존재하는 아이디 입니다.");
            } else if (response.status === 400) {
                alert("비밀번호가 일치하지 않습니다.");
            } else {
                alert("회원가입에 실패했습니다.");
            }
        } catch (error) {
            if (error.response) {
                // 서버가 2xx 외의 상태 코드를 반환한 경우
                if (error.response.status === 409) {
                    alert("이미 존재하는 아이디 입니다.");
                } else if (error.response.status === 400) {
                    console.log(data);
                    alert("에러 메시지 비밀번호가 일치하지 않습니다.");
                } else {
                    alert("회원가입에 실패했습니다.");
                }
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못한 경우
                console.error('Error: No response received', error.request);
                alert("서버로부터 응답이 없습니다. 서버가 실행 중인지 확인하세요.");
            } else {
                // 요청을 설정하는 중에 오류가 발생한 경우
                console.error('Error:', error.message);
                alert("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Container>
                <Title>회원가입</Title>
                 <form onSubmit={handleSubmit(onSubmit)}>
                     <Input
                         type='text' {...register('name')}
                         placeholder="이름"
                     />
                     { errors.name && <Error>{errors.name.message}</Error>}
                    <Input
                         type='text' {...register('username')}
                         placeholder="아이디" 
                     />
                     { errors.username && <Error>{errors.username.message}</Error>}
                     <Input
                         type='text' {...register("email")}
                         placeholder="이메일" 
                     />
                     { errors.email && <Error>{errors.email.message}</Error>}
                     <Input
                         type='number' {...register('age')}
                         placeholder="나이"
                     />
                     { errors.age && <Error>{errors.age.message}</Error>}
                     <Input
                         type='password' {...register('password')}
                         placeholder="비밀번호" 
                     />
                     { errors.password && <Error>{errors.password.message}</Error>}
                     <Input
                         type='password' {...register("passwordCheck")}
                         placeholder="비밀번호 확인" 
                     />
                     { errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}
                    
                     
                     <Button type='submit'>가입하기</Button>
                     <ToLogin onClick={handleLoginClick}>이미 회원이신가요? 로그인 하러 가기</ToLogin>
                 </form>
                
             </Container>
    )
}

export default SignUp

