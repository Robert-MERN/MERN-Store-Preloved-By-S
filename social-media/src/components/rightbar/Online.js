import React from 'react'

const Online = ({users}) => {
    return (
        <>
            {users.userId &&
                <div key={users.id} className="onlineFriendContainer">
                    <div className="onlineUsers">
                        <div className="onlineSign"></div>
                        <img src= { users.profile } alt="" className="onlineUserImage" />
                        <p className="onlineUserName">{users.user}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default Online
