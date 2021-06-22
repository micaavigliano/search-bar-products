import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import Logo from '../img/Logo_ML.png'
import Search from '../img/ic_Search.png'

const SearchBar= ({onSubmit}) => {
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = useCallback(
        (value) => {
          value.preventDefault();
          onSubmit(inputValue);
          setInputValue('');
        },
        [onSubmit, inputValue]
      );

    return (
        <FormWrapper>
            <ImgWrapper>
                <img src={Logo} alt=""/>
            </ImgWrapper>
            <Form onSubmit={handleSubmit}>
                <InputWrapper placeholder="Nunca dejes de buscar" type="text" onChange={(e) => setInputValue(e.currentTarget.value)}></InputWrapper>
                <ButtonWrapper>
                    <img src={Search} alt=""/>
                </ButtonWrapper>
            </Form>
        </FormWrapper>
    )
}

const ImgWrapper = styled.button`
    border: none;
    background-color: transparent;
    margin-left: 20%;
`

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    margin: auto;
    background-color: #FFE630;
`

const Form = styled.form`
    margin-left: 30px;
    width:100%;
    display: flex;
    flex-direction: row;
`

const ButtonWrapper = styled.button`
    border: none;
    background: #EEEEEE;
    cursor: pointer;
    height: 38px;
    width: 38px;
    &:focus{
        outline: 2px solid red;
    }
`

const InputWrapper = styled.input`
    background: white;
    border: none;
    padding: 8px 16px 8px 16px;
    outline: none;
    width: 60%;
    font-size: 1.2rem;
    &:focus{
        outline: 2px solid red;
    }
    &::placeholder{
        color: #999999;
    }
`

export default SearchBar;