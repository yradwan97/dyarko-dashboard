import React from 'react'
import {AiFillCheckCircle} from 'react-icons/ai'
import { Typography } from 'components/shared/UI'

function PackagPoint(props) {
  const { disable } = props
  return (
    <div className='flex gap-x-4'>
        <AiFillCheckCircle className={`${ disable? 'text-gray-400' : 'text-[#3CEBC1]'} text-2xl`}/>
        <Typography
            variant='body-sm-medium'
            as='span' 
            className={`${ disable? 'text-gray-400 line-through' : 'text-gray-700'} capitalize`}>
            Checklist item title
        </Typography>
    </div>
  )
}

export default PackagPoint
