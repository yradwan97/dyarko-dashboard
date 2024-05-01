import React from 'react'
import Package from './components/Package'

function Plans() {
  return (
    <div className='flex gap-x-3'>
      {['golden', 'sliver', 'pronze'].map(packageType => (
        <Package packageType={packageType}/>
      ))}
    </div>
  )
}

export default Plans