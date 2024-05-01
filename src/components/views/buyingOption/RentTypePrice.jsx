import React from 'react'

function RentTypePrice() {
  return (
     <div className='grid grid-cols-2 gap-3 mt-6'>
            <div className='max-w-1/2 grow'>
              <label className='mb-4 block'>Daily Rent*</label>
              <div className='border border-gray-200 rounded-lg overflow-hidden flex'>
                <span className='py-3 px-4 border-r border-gray-200 text-gray-400 text-sm'>$</span>
                <input type="text" className='py-3 px-4 grow outline-0 text-gray-500 text-sm font-medium' placeholder='e.g. 2000'/>
              </div>
            </div>
            <div className='max-w-1/2 grow'>
              <label className='mb-4 block'>Daily Rent*</label>
              <div className='border border-gray-200 rounded-lg overflow-hidden flex'>
                <span className='py-3 px-4 border-r border-gray-200 text-gray-400 text-sm'>$</span>
                <input type="text" className='py-3 px-4 grow outline-0 text-gray-500 text-sm font-medium' placeholder='e.g. 2000'/>
              </div>
            </div>
          </div>
  )
}

export default RentTypePrice