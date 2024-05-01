import React from 'react'
import {Typography} from 'components/shared/UI'

function Methods({method, setMethod}) {

  return (
    <>
        <div className='flex justify-between gap-x-4 w-full'>
            <label 
                htmlFor='sale' 
                className={`${method === 'sale'? 'md:border-main-600 md:bg-main-100' : 'md:border-gray-200'} flex flex-1 items-center md:justify-between gap-x-3 md:border py-3 md:px-4 rounded-lg`}
                // onClick={()=>handleClick("sale")}
                >
                <div className='md:flex items-center md:gap-x-3 order-2 md:order-1'>
                    <Typography variant='body-sm-medium' as='span' className="text-black capitalize">sale</Typography>
                </div>
                <input 
                type="radio" 
                id="sale" 
                name="sale" 
                value="sale"
                className="accent-[#0096db] w-5 h-5 order-1 md:order-2"
                checked={method === 'sale'}
                onChange={(e)=>setMethod(e.target.value)}
                />
            </label>   
            <label 
                htmlFor='rent' 
                className={`${method === 'rent'? 'md:border-main-600 md:bg-main-100' : 'border-gray-200'} flex flex-1 items-center md:justify-between gap-x-3 md:border py-4 md:px-4 rounded-lg`}
                // onClick={()=>handleClick("rent")}
                >
                <div className='md:flex items-center md:gap-x-3 order-2 md:order-1'>
                    <Typography variant='body-sm-medium' as='span' className="text-black capitalize">rent</Typography>
                </div>
                <input 
                    type="radio" 
                    id="rent" 
                    name="rent" 
                    value="rent"
                    className='accent-[#0096db] w-5 h-5 order-1 md:order-2'
                    checked={method === 'rent'}
                    onChange={(e)=>setMethod(e.target.value)}
                    />
            </label>
        </div>
    </>
  )
}

export default Methods
