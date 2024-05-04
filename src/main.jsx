import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Profile from './pages/Profile.jsx'
// import NotFoundPage from './pages/NotFoundPage.jsx'
// import Profiles from './pages/Profiles.jsx'
// import MainPage from './components/MainPage.jsx'
// import Home from './components/Home.jsx'


/*const router = createBrowserRouter([{
  path:'/',
  element: <Home />,
  errorElement: <NotFoundPage />,
},
{
  path:'/movie',
  element: <MainPage />,
  errorElement: <NotFoundPage />,
},
{
  path: '/profiles/:profileId',
  element: <Profile />,
},
])*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
    //<RouterProvider router={router}/>