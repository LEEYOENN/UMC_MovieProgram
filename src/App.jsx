import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage.jsx'
import TopRated from './components/TopRated.jsx'
import Home from './components/Home.jsx'
import Nav from './components/Navbar.jsx'
import Foot from './components/Footer.jsx'
import NowPlaying from './routers/NowPlaying.jsx'
import { dummy } from './routers/NowPlayingDummy.jsx'
import './App.css'
import NowPlayingComp from './components/NowPlayingComp.jsx'
import Popular from './components/Popular.jsx'
import UpComing from './components/UpComing.jsx'

function App() {
  return (
    <BrowserRouter> 
      <div>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/toprated' element={<TopRated />}/>
          <Route path='/nowplaying' element={<NowPlayingComp />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/upcoming' element={<UpComing />} />
        </Routes>     
       <Foot />
      </div>

    </BrowserRouter>
  )
}

export default App
