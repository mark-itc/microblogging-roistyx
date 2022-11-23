import React from 'react'
import './Post.css'


export default function Post({tweetMessage, date, username}) {

  return (
    <div className='post'>
        <div className='header'> 
            <div className='username'>
                {username}
            </div>
            <div className='date'>{date}</div>
        </div>
        <div className='post-body'>
        {tweetMessage}

        </div>
    </div>
   
  )
}
