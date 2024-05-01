import React from 'react'
import Typography from 'components/shared/UI/Typography'
import {BiChevronRight} from 'react-icons/bi'

function Process() {
    const process = [{
        id: 1,
        name:'Buying Option'
    },{
        id:2,
        name:'Property Deatils'
    },{
        id:3,
        name:'Property Features'
    }]

  return (
    <div className='flex justify-center items-center'>
        {process.map(pro=>(
            <div className='flex items-center justify-center' key={pro.id}>
                <span className='w-7 h-7 bg-main-600 text-white flex justify-center items-center rounded-full text-xs font-bold '>{pro.id}</span>
                  <Typography variant='body-sm-medium' as='p' className="text-black ml-2">{pro.name}</Typography>
                  <BiChevronRight className='text-xl text-main-secondary mx-6'/>
            </div>
        ))}
              {/* <div className='flex items-center justify-center'>
                  <span className='w-7 h-7 bg-main-200 text-black flex justify-center items-center rounded-full text-xs font-bold '>1</span>
                  <Typography variant='body-md-medium' as='p' className="text-black ml-2">Personal</Typography>
                  <ChevronRight className='w-3 h-3 stroke-main-secondary mx-6' />
              </div>
              <div className='flex items-center justify-center'>
                  <span className='w-7 h-7 bg-main-200 text-black flex justify-center items-center rounded-full text-xs font-bold '>1</span>
                  <Typography variant='body-md-medium' as='p' className="text-black ml-2">Personal</Typography>
              </div> */}

        </div>
  )
}

export default Process
