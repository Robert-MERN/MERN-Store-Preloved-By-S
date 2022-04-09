import React from 'react'
import Status from './status/Status';
import Post from './post/Post';
import data from '../../data/data.json';
import './feed.css';



function Feed() {
    
    return (
        <div className="parent-2">
            <Status />
            {data.map((item)=> (
                <Post key={item.id} posts={item} />
            ))}
        </div>
    )
}

export default Feed
