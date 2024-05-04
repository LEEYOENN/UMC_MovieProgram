import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className='flex flex-col gap-2'>404 Not Found
        <br></br>
        <Link to="/">Home from Link</Link>
    </div>
  )
}

export default NotFoundPage