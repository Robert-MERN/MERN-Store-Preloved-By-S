import React, { useState } from 'react'
import styled from "styled-components";

export default function Input({data, onChange}) {
    const [ handleFocus, setHandleFocus ] = useState(false)
    const { id, label, errorMessage, pattern, ...others } = data;
    return (
        <InputWrapper>
            <label>{label}</label>
            <div className="input">
                <input {...others} onChange={onChange} required pattern={pattern} onBlur={()=>{setHandleFocus(true)}} focused={handleFocus.toString()} onFocus={()=> {data.name === "confirmPassword" && setHandleFocus(true)}}/>
                <span>{errorMessage}</span>
            </div>
        </InputWrapper>
    )
}
const InputWrapper= styled.div`
    margin-bottom: 20px;
    transition: all 250ms ease-in;
    label{
        font-size: 17px;
        font-weight: 500;
        transition: all 250ms ease-in;
    }
    span{
       font-size: 15px;
       color: red;
       display: none;
       margin-top: 6px;
       animation: showError 0.3s ease-in;
       transition: all 250ms ease-in;
    }
    @keyframes showError {
        from{
            opacity: 0;
        } to{
            opacity: 1;
        }
    }
    .input{
        width: 100%;
        min-height: 45px;
        margin: 15px 0 5px 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
        transition: all 250ms ease-in;
        input{
            padding-left: 8px;
            border: 1px solid #c4c4c4;
            outline: none;
            font-size: 17px;
            color: #2b2b2b;
            width: 100%;
            padding: 13px 0 13px 8px;
            transition: all 250ms ease-in;
        }
        input:focus{
            border: 1px solid black;
            transition: all 250ms ease-in;
        }
        input:invalid[focused="true"]{
            border: 1px solid red;
        }
        input:invalid[focused="true"] ~span{
            display: block;
            animation: showError 0.3s ease-in;
            transition: all 250ms ease-in;  
        }
    };
`