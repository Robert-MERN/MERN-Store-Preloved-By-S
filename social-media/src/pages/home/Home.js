import React from 'react'
import './home.css';
import Header from '../../components/header/Header';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';

function Home() {
    return (
        <>
            <Header />
            <div className="wrapper">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </>
    )
}

export default Home
