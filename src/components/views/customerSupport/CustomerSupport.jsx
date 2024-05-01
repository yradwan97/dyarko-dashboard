import React from 'react'
import avatar from '../../../assets/images/avatar2.png'

function CustomerSupport() {
  return (
    <div className='bg-[#EFFAFF] p-6'>
      <div className='flex gap-x-3 w-1/2'>
        <img className='w-10 h-10 rounded-lg' src={avatar} alt='avatar'/>
        <div className=''>
          <p className='bg-white p-4 text-gray-700 text-sm font-medium whitespace-pre-line'>{`Hi Alaa,
           I’m Souhail Dyarko agent,
           how can I help you`}</p>
           <span className='text-main-secondary block text-xs font-medium mt-4'>13:32 PM</span>
        </div>
      </div>
      <div className='flex justify-end gap-x-3 w-1/2 ml-auto'>
        <img className='w-10 h-10 rounded-lg' src={avatar} alt='avatar'/>
        <div className=''>
          <p className='bg-main-600 p-4 text-white text-sm font-medium whitespace-pre-line '>{`yes, it’s available to rent 🙂`}</p>
          <span className='text-main-secondary block text-right text-xs font-medium mt-4'>13:32 PM</span>
        </div>
      </div>
    </div>
  )
}

export default CustomerSupport