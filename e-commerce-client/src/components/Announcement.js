import React from 'react'
import styled from 'styled-components';
import { mobile } from "../responsive";
export default function Announcement () {
    return (
        <AnnouncementContainer>
            <p>Super Deal! Free Shipping on Orders Over $99</p>
        </AnnouncementContainer>
    )
}

const AnnouncementContainer = styled.div`
    height: 35px;
    background: teal;
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: center;
    ${mobile({marginBottom: "8px"})}
    p{
        font-size: 14.5px;
        letter-spacing: 1px;
        color: white;
        font-weight: 400;
        user-select: none;
    }
`
