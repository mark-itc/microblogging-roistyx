import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Post.css'


export default function Post({tweetMessage, date, username}) {

  return (
    <div key={uuidv4} className='post'>
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
