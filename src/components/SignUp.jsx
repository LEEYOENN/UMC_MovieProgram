import React from 'react'
import styled from 'styled-components'; 
import { useState } from 'react';
import 'normalize.css';

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

function SignUp() {

    const [form, setForm] = useState({
        name: '',
        validName: false,
        email: '',
        validEmail: false,
        age: '',
        validAge: false,
        password: '',
        validPassword: false,
        passwordCheck: '',
        validPasswordCheck: false
    })

    const [passMessage, setPassMessage] = useState({
        name: '',
        email: '',
        age: '',
        password: '',
        passwordCheck: '',
    })

    const handleInputChange = (e) => {
        const obj = e.target.name;
        const value = e.target.value
        setForm(prevState => ({
            ...prevState,
            [obj]: value
        }));

        switch(obj){
            case 'name':
                {if(form.name.trim() === ''){
                    setPassMessage(prevState => ({...prevState, name:"이름을 입력하세요."}))
                } else if(!/^[a-zA-Z]+$/.test(form.name)){
                    setPassMessage(prevState => ({...prevState, name:"이름은 문자열만 허용됩니다."}))
                } else {
                    setPassMessage(prevState => ({...prevState, name: ""}));
                    form.validName=true;
                }
                break;}
            case 'email':
                {if (form.email.trim() === ''){
                    setPassMessage(prevState => ({...prevState, email: "이메일을 입력하세요."}))
                 
                } else if(!/\S+@\S+.\S+/.test(form.email)){
                    setPassMessage(prevState => ({...prevState, email:"올바른 이메일 형식이 아닙니다."}))
                
                } else {
                    setPassMessage(prevState => ({...prevState, email: ""}));
                    form.validEmail=true;
                }
                break;}
            case 'age':
                {if (form.age.length === 0){
                    setPassMessage(prevState => ({...prevState, age: "나이를 입력하세요."}))
            
                } else if (isNaN(form.age)) {
                    setPassMessage(prevState => ({...prevState, age: "나이는 숫자여야 합니다."}))
                 
                } else if (form.age < 0){
                    setPassMessage(prevState => ({...prevState, age: "나이는 음수가 될 수 없습니다."}))
                  
                } else if (form.age % 1 !== 0) {
                    setPassMessage(prevState => ({...prevState, age:"나이는 소수가 될 수 없습니다."}))
                   
                } else if (form.age < 19) {
                    setPassMessage(prevState => ({...prevState, age: "우리 영화 사이트는 19살 이상만 가입이 가능합니다."}))
                  
                } else {
                    setPassMessage(prevState => ({...prevState, age: ""}))
                    form.validAge=true;
                }
                break;}
            case 'password':
                {if(form.password.trim() === ''){
                    setPassMessage(prevState => ({...prevState, password: "비밀번호를 입력하세요."}))
             
                } else if (form.password.length <4){
                    setPassMessage(prevState => ({...prevState, password: "비밀번호는 최소 4자 이상이어야 합니다."}))
        
                } else if (form.password.length > 12){
                    setPassMessage(prevState => ({...prevState, password: "비밀번호는 최대 12자 이하이어야 합니다."}))
            
                } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,12}$/.test(form.password)){
                    setPassMessage(prevState => ({...prevState, password: "영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야합니다."}))
                
                } else {
                    setPassMessage(prevState => ({...prevState, password: ""}));
                    form.validPassword=true;
                }
                break;}
            case 'passwordCheck':
            {
                if(form.passwordCheck.trim() === ''){
                    setPassMessage(prevState => ({...prevState, passwordCheck: "비밀번호 확인을 입력하세요."}))
        
                } else if( form.passwordCheck !== form.password) {
                    setPassMessage(prevState=>({prevState, passwoerCheck: "비밀번호가 일치하지 않습니다."}))
            
                } else {
                    setPassMessage(prevState => ({...prevState, passwordCheck: ""}));
                    form.validPasswordCheck=true;
                }
                break;
            }
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        validateForm();

        if (form.validName && form.validEmail && form.validAge && form.validPassword &&form.validPasswordCheck){
            console.log("Username: ", form.name);
            console.log("E-mail: ", form.email)
            console.log("Age: ", form.age)
            console.log("Password: ", form.password);
        }

        
    }
    
  return (
    <Container>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
            <Input
                type='text' placeholder="name" 
                value={form.name} name='name'
                onChange={ handleInputChange }
            />
            <Error>{passMessage.name}</Error>
            <Input
                type='text' placeholder="e-mail" 
                value={form.email} name='email'
                onChange={ handleInputChange }
            />
            <Error>{passMessage.email}</Error>
            <Input
                type='number' placeholder="나이" 
                value={form.age} name='age'
                onChange={ handleInputChange }
            />
            <Error>{passMessage.age}</Error>
            <Input
                type='password' placeholder="password" 
                value={form.password} name='password'
                onChange={ handleInputChange }
            />
            <Error>{passMessage.password}</Error>
            <Input
                type='password' placeholder="password check" 
                value={form.passwordCheck} name='passwordCheck'
                onChange={ handleInputChange }
            />
            <Error>{passMessage.passwordCheck}</Error>
            <Button type='submit'>가입하기</Button>

        </form>
    </Container>
  )
};

export default SignUp