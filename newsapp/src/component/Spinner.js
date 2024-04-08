import React from 'react'
import Loader from './Loader.gif'

export default function Spinner() {
  return (
    <div className='text-center pt-3'>
      <img src={Loader} alt="loading"  style={{ height: '30px' }} />
    </div>
  )
}
