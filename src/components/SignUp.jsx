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
`;
const Title = styled.h2`
    margin-top: 60px;
    margin-bottom: 40px;
    text-align: center;
    color: white;
`;
const Input = styled.input`
    width: 400px;
    margin-bottom: 30px;
    padding-left: 40px;
    height: 25px;
    padding: 10px 10px 10px 30px;
    border: 1px solid #ccc;
    border-radius: 20px;
`;
const Error = styled.p`
    font-size: 12px;
    color: red;
    margin-top:-10px; 
    margin-bottom: 20px;
`;
const NoError = styled.p`
    font-size: 12px;
    color: green;
    margin-top:-10px; 
    margin-bottom: 20px;
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
    `;
const ToLogin = styled.h4`
    margin-top: 60px;
    margin-bottom: 40px;
    text-align: center;
    color: white;
    &:hover{
        cursor: pointer;
    }
`;

const schema = yup.object().shape({
    name: yup.string().required("이름을 입력하세요."),
    userid: yup.string().required("아이디를 입력해주세요."),
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
    confirmPassword: yup
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
            }
            else if(response.status === 409){
                alert("이미 존재하는 아이디 입니다.");
            }
            else if(response.status === 400){
                alert("비밀번호가 일치하지 않습니다.");
            }
            else{
                alert("회원가입에 실패했습니다.");
            }    
        } catch (error) {
            alert("회원가입 중 오류가 발생했습니다.");
        }
    }

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
                         type='text' {...register('userid')}
                         placeholder="아이디" 
                     />
                     { errors.userid && <Error>{errors.userid.message}</Error>}
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
                     { errors.password ? <Error>{errors.password.message}</Error> : <NoError>안전한 비밀번호입니다.</NoError>}
                     <Input
                         type='password' {...register("confirmPassword")}
                         placeholder="비밀번호 확인" 
                     />
                     { errors.confirmPassword ? <Error>{errors.confirmPassword.message}</Error> : <NoError>비밀번호가 일치합니다.</NoError>}
                    
                     <Button type='submit'>가입하기</Button>
                     <ToLogin onClick={handleLoginClick}>이미 회원이신가요? 로그인 하러 가기</ToLogin>
                 </form>
                
             </Container>
    )
}

export default SignUp

