import React from 'react'
import { Outlet } from 'react-router-dom'
import Typography from 'components/shared/UI/Typography'
import Process from './Process'

function AddProperty() {
  return (
    <div className='bg-white py-20'>
      <div className='md:w-8/12 mx-auto'>
        <Typography variant="h3" as="h3" className="text-black text-center mb-4">Add New Property</Typography>
        <Typography variant='body-md' as="p" className="text-main-secondary mb-12 text-center md:w-3/5 mx-auto">Make sure you have filled in all the necessary fields and have uploaded all the required files.</Typography>
        <Process/>
          <Outlet/>
      </div>
    </div>
  )
}

export default AddProperty
