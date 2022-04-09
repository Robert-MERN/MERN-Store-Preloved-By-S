import React from 'react'
import './sidebar.css';

function SidebarBottom({users}) {
    return (
        <>
            {users.userId &&
            <div className="user">
                <div className="imageWrapper">
                    <img src={users.profile} alt="" className="img2" />
                    <span className="spanText">{users.user}</span>
                </div>  
            </div>
            }
        </>
    )
}

export default SidebarBottom
