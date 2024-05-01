import React, { useState } from 'react'
import { Typography } from "components/shared/UI";

function PaymentOption() {
      const [option, setOption] = useState('cash')

  return (
    <div>
        <Typography variant='body-sm-medium' as='p' className="text-black">Please select the Payment option</Typography>
        <div className='flex gap-x-4 items-center'>
            {["installment", "cash"].map(a => (
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
                    className={`${option === a & 'accent-main-600' } w-5 h-5`}
                    checked={option === a}
                    onChange={(e)=>setOption(e.target.value)}
                    />
                <div className='md:flex items-center md:gap-x-3 order-2 md:order-1'>
                    <Typography variant='body-sm-medium' as='span' className="text-black capitalize">{a}</Typography>
                </div>
            </label>
          ))}
        </div>
    </div>
  )
}

export default PaymentOption
