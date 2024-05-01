import React from 'react'
import { Typography } from 'components/shared/UI'

function PackagePrice() {
  return (
    <div className='flex items-end'>
        <Typography variant="h2" as="h2" className='text-black'>$90</Typography>
        <Typography variant='body-md-medium' as='span' className="text-gray-400">/month</Typography>
    </div>
  )
}

export default PackagePrice
