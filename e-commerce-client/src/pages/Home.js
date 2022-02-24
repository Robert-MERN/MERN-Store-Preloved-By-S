import React from 'react'
import Navbar from "../components/Navbar";
import Announcement from '../components/Announcement';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
import NewsLetter from '../components/NewsLetter';
import Footer from "../components/Footer" 
export default function Home() {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Carousel />
            <Categories />
            <ProductList/>
            <NewsLetter />
            <Footer/>
        </div>
    )
}

