import React from 'react'
import { useNavigate } from 'react-router-dom'
const ErrorPage = () => {
    let navigate = useNavigate()
  return (
    <div className='p-3'>
        <h2>Error! Page Not Found</h2>
        <button className='btn btn-info text-white' onClick={() => {navigate('/')}}>Back to home</button>
    </div>
  )
}

export default ErrorPage