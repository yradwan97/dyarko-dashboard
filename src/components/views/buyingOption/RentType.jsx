import React from 'react'
import { Typography } from "components/shared/UI";

function RentType() {
    // const [type, setType] = useState('')
  return (
    <div className='mt-6'>
        <Typography variant='body-sm-medium' as='p' className="text-black">Does this property already has a renter?</Typography>
        <div className='flex items-center gap-x-20'>
          {["daily", "weekly", "monthly"].map(el => (
            <label 
                htmlFor={el}
                className={` flex items-center gap-x-3 py-4 md:px-4 rounded-lg`}
                // onClick={()=>handleClick("rent")}
                >
                
                <input 
                    type="checkbox" 
                    id={el}
                    name={el}
                    className={`accent-main-500 text-sm w-4 h-4  rounded-lg checked:before:bg-white`}
                    // checked={answer === a}
                    // onChange={(e)=>setAnswer(e.target.value)}
                    />
                <div className='md:flex items-center md:gap-x-3 order-2 md:order-1'>
                    <Typography variant='body-sm-medium' as='span' className="text-black capitalize">{el}</Typography>
                </div>
            </label>
          ))}
        </div>
    </div>
  )
}

export default RentType
