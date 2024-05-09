import React from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import TopRated from './components/TopRated.jsx'
import Home from './components/Home.jsx'
import Nav from './components/Navbar.jsx'
import Foot from './components/Footer.jsx'
import './App.css'
import NowPlaying from './components/NowPlaying.jsx'
import Popular from './components/Popular.jsx'
import UpComing from './components/UpComing.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import 'normalize.css'
import MovieDetail from './components/MovieDetail.jsx'
function App() {
  const { id } = useParams();
  return (
    <BrowserRouter> 
      <div>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/toprated' element={<TopRated />}/>
          <Route path='/nowplaying' element={<NowPlaying />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/upcoming' element={<UpComing />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/*' element={<NotFoundPage />}/>
        </Routes>     
       <Foot />
      </div>

    </BrowserRouter>
  )
}

export default App
