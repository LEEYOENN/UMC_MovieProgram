import NowPlaying from '../routers/NowPlaying.jsx'
import { dummy } from '../routers/NowPlayingDummy.jsx'
import React from 'react'
import "./NowPlayingComp.css"

function NowPlayingComp() {
  return (
    <div className='app-container'>
    {dummy.results.map((item) =>
          {
            return (
            <NowPlaying  
            title={item.title} 
            poster_path={item.poster_path} 
            vote_average={item.vote_average}/>
            )

        }
    )}
    </div>
  )
}

export default NowPlayingComp