import React from 'react'
import { useEffect, useState } from 'react'
import './Home.css'

function Home() {

    return (

        <>
        <body className='back'>
            <div className='enter'>
            <h3 className='h1'>환영합니다!</h3>
            </div>
            <div className='searchdiv'>
                <h1 className='search'>Find Your Movie!</h1>
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