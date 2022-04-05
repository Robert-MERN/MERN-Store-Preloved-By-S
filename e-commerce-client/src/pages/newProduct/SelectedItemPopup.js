import React,{ useState } from 'react'
import styled from "styled-components";

function SelectedItemPopup({data, color, click, name}) {
  return (
    <SelectedItemPopupWrapper>
        {data.map((each)=>(
            <PopupItemChild  identity={name} key={each} item={each} >
                {color&&
                    <span></span>
                }
                <p className="text">{each}</p>
                <p onClick={()=>click(each, name)} className="cancel">X</p>
            </PopupItemChild >
        ))}
    </SelectedItemPopupWrapper>
  )
}

const SelectedItemPopupWrapper  = styled.div`
    display: flex;
    width: 450px;
    flex-wrap: wrap;
`
const PopupItemChild = styled.div`
    height: 24px;
    display: flex;
    align-items: center;
    margin: 0 5px 6px 2px;
    padding: 2px 8px;
    background-image: ${props=> props.identity === "color"?"linear-gradient(135deg, #ff9a9e 10%, #fad0c4 100%)":props.identity === "size"? "linear-gradient(135deg, #667eea 10%, #764ba2 100%)":"linear-gradient(135deg, #c79081 10%, #dfa579 100%)"};
    border-radius: 15px;
    box-sizing: border-box;
    .text{
        padding: 4px 8px 8px 8px;
        max-width: 80px;
        align-items: center;
        color: ${props=> props.identity === "size"?"white":props.identity === "category"? "black" :"#646464"};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        font-weight: 500;
    }
    span{
        width: 15px;
        height: 15px;
        background-color: ${props=> props.item};
        margin: 0 4px 0 2px;
    }
    .cancel{
        margin: 0 3px;
        font-family: sans-serif;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 250ms ease;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }
    .cancel:hover{
        opacity: 0.6;
    }
`

export default SelectedItemPopup

