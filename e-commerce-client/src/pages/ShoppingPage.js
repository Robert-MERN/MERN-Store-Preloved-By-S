import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import Announcement from '../components/Announcement';
import ProductList from '../components/ProductList';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import styled from "styled-components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Fade from "react-reveal/Fade";
import { mobile } from "../responsive";



export default function ShoppingPage() {
    const [ filter, setFilter ] = useState({}); 
    const [ sort, setSort ] = useState("newest"); 
    const [ color, setColor ] = useState(""); 
    const [ size, setSize ] = useState(""); 

  const handleColorChange = (e) => {
    setFilter({...filter, [e.target.name]: e.target.value});
    setColor(e.target.value)
};
const handleSizeChange = (e) => {
    setFilter({...filter, [e.target.name]: e.target.value});
    setSize(e.target.value)
};

const handleSortChange = (e) => {
    setSort(e.target.value);
};
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Fade top cascade>
                <Header>
                    Dresses
                </Header>
            </Fade>
            <SecondHeader>
                <Left>
                    <Fade bottom cascade>
                        <p>Filter Products:</p>
                    </Fade>
                    <Fade top>
                        <Box sx={{ width: 120 }} className='colorBox'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={color}
                                    name="color"
                                    label="color"
                                    onChange={handleColorChange}
                                    className="selectBox"
                                >
                                    <MenuItem value="black" >Black</MenuItem>
                                    <MenuItem value="blue" >Blue</MenuItem>
                                    <MenuItem value="brown" >Brown</MenuItem>
                                    <MenuItem value="white" >White</MenuItem>
                                    <MenuItem value="teal" >Teal</MenuItem>
                                    <MenuItem value="dark-green" >Dark Green</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Fade>
                    <Fade bottom>
                        <Box sx={{ width: 120 }} className='sizeBox'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={size}
                                    label="size"
                                    name="size"
                                    onChange={handleSizeChange}
                                    className="selectBox"
                                >
                                    <MenuItem value="small">Small</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="large">Large</MenuItem>
                                    <MenuItem value="xl">Xl</MenuItem>
                                    <MenuItem value="xxl">XXl</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Fade>
                </Left>
                <Right>
                    <Fade left cascade>
                        <p>Sort Products:</p>
                    </Fade>
                    <Fade top>
                        <Box sx={{ width: 120 }} className='sortBox'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sort}
                                    label="sort"
                                    onChange={handleSortChange}
                                    className="selectBox"
                                >
                                    <MenuItem value="newest">Newest</MenuItem>
                                    <MenuItem value="asc">Price(asc)</MenuItem>
                                    <MenuItem value="desc">Price(desc)</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Fade>
                </Right>
            </SecondHeader>
            <ProductList sort={sort} filter={filter} />
            <NewsLetter />
            <Footer />
        </div>
    )
}

const Header = styled.h1`
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
`
const SecondHeader = styled.div`
    display: flex;
    padding: 0 20px;
    margin-bottom: 20px;
    ${mobile({alignItems: "flex-start"})}
    .selectBox{
        transition: all 250ms;
    }
    .colorBox, .sortBox, .sizeBox{
        margin-left: 15px;
        ${mobile({margin: "0 0 10px 0"})}
    }
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    ${mobile({flexDirection: "column", alignItems: "flex-start"})}
    p {
        font-size: 24px;
        font-weight: 600;
        ${mobile({fontSize: "20px"})} 
    }
    `
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flexDirection: "column", alignItems: "flex-end"})}
    p {
        font-size: 24px;
        font-weight: 600;
        ${mobile({fontSize: "20px"})} 
    }
`
