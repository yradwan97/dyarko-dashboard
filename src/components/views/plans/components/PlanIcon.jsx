import React from 'react'
import Medal2Icon from '../../../shared/icons/Medal2Icon'

function PlanIcon({background}) {
  return (
    <div className={`rounded-lg w-[57px] h-[58px] ${background} flex justify-center items-center`}>
        <Medal2Icon className="fill-white w-8 h-8"/>
    </div>
  )
}

export default PlanIcon