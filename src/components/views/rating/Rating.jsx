import React from 'react'
import AvatarImg from '../../../assets/images/avatar2.png'
import { Typography } from 'components/shared/UI'
import {AiFillStar} from 'react-icons/ai'

function Rating() {
  return (
    <div className='px-7 py-10 border border-main-300 rounded-lg space-y-4 bg-main-100'>
        <div className='flex items-center gap-x-4'>
            <img src={AvatarImg} className='w-16 h-16 rounded-full' alt=""/>
            <div className='flex flex-col space-y-2 md:space-y-3'>
                <Typography variant='body-lg-bold' as="h4">Taylor Wilson</Typography>
                <div className='flex flex-col md:flex-row md:items-center md:gap-x-2'>
                    <AiFillStar className='text-main-orange-600'/>
                    <Typography variant='body-xs-medium' as='span' className="text-black">4.5 review</Typography>
                </div>
            </div>
        </div>
        <Typography variant='body-md-medium' as='p' className="text-gray-600 md:text-gray-800 md:w-10/12">Eget eu massa et consectetur. Mauris donec. Leo a, id sed duis proin sodales. Turpis viverra diam porttitor mattis morbi ac amet. Euismod commodo. We get you customer relationships that last.</Typography>
        <Typography variant='body-sm-medium' as='span' className="text-gray-500 block">02 June 2022</Typography>
    </div>
  )
}

export default Rating
