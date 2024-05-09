import React from 'react'
import { useEffect, useState } from 'react'
import './Home.css'
import 'normalize.css'

function Home() {

    return (

        <>
        <body className='back'>
            <div className='enter'>
            <h2 className='h1'>환영합니다!</h2>
            </div>
            <div className='searchdiv'>
                <h1 className='search'>Find Your Movie!🎥🎬</h1>
                <div className='searchbar'>
                <form>
                    <input></input>
                    <button>search</button>
                </form>
                </div>
            </div>
        </body>
   
        </>
    )
}
export default Home