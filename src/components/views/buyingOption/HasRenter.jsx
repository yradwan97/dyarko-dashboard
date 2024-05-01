import React, { useState } from 'react'
import Label from '../../shared/label/Label'
import {Typography, Button} from 'components/shared/UI'
import RentType from './RentType'
import RentTypePrice from './RentTypePrice'
import UploadFile from '../../shared/uploadFile/UploadFile'

function HasRenter() {
    const [answer, setAnswer] = useState('yes')
   
  return (
    <>
    <div className='mt-6'>
        <Typography variant='body-sm-medium' as='p' className="text-black">Does this property already has a renter?</Typography>
        <div className='flex items-center gap-x-20'>
          {["yes", "no"].map(a => (
            <label 
                htmlFor={a} 
                className={` flex items-center gap-x-3 py-4 md:px-4 rounded-lg`}
                // onClick={()=>handleClick("rent")}
                >
                
                <input 
                    type="radio" 
                    id={a}
                    name={a}
                    value={a}
                    className={`${answer === a & 'accent-main-600' } w-5 h-5`}
                    checked={answer === a}
                    onChange={(e)=>setAnswer(e.target.value)}
                    />
                <div className='md:flex items-center md:gap-x-3 order-2 md:order-1'>
                    <Typography variant='body-sm-medium' as='span' className="text-black capitalize">{a}</Typography>
                </div>
            </label>
          ))}
        </div>
    </div>
    {answer === "yes"?
    <>
      <div className='flex gap-x-4'>
        <div className='mt-6 max-w-1/2 grow'>
          <Label htmlFor='rentalId'>Renta Dyarko ID</Label>
          <Button variant='input' id="rentalId" className="w-full" placeholder="e.g. 212367"/>
        </div>
        <div className='mt-6 max-w-1/2 grow'>
          <Label htmlFor='rentalPeriod'>Rental period</Label>
          <Button variant='input' id="rentalPeriod" className="w-full" placeholder="2 years"/>
        </div>
      </div>
      <UploadFile/>
      <RentType/>
      <RentTypePrice/>
    </>
    :
    <>
    <RentType/>
    <RentTypePrice/>
    </>
    }
    </>
  )
}

export default HasRenter
