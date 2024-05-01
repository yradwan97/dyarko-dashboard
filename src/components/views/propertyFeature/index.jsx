import React, { useState } from 'react'
import Label from '../../shared/label/Label'
import { Typography, Button } from 'components/shared/UI'
import UploadImages from '../../shared/uploadImages'
import SelectAminities from '../../shared/selectAminities/SelectAminities'
import { useNavigate } from "react-router-dom";
import SuccessMessage from '../../shared/successMessage/SuccessMessage'

function PropertyFeature() {
  const [answer, setAnswer] = useState('yes')
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();

  return (
    <>
    <div className='border border-gray-200 p-6 rounded-lg mt-12'>
      <Typography variant="body-md-bold" as="h5" className="text-black mb-4">PropertyFeature</Typography>
      <UploadImages/> 
      <div className='mt-6'>
        <Label htmlFor="title">Title</Label>
        <Button variant='input' id="title" type="text" className="w-full"/>
      </div>
      <div className='flex justify-between items-center gap-x-3 mt-6'>
        <div className='flex-1 max-w-1/4'>
          <Label htmlFor="area">Area</Label>
          <Button variant='input' id="area" type="text" className="w-full" placeholder="m2"/>
        </div>
        <div className='flex-1 max-w-1/4'>
          <Label htmlFor="area">Bedrooms*</Label>
          <Button variant='input' id="area" type="text" className="w-full" placeholder="How many beds"/>
        </div>
        <div className='flex-1 max-w-1/4'>
          <Label htmlFor="area">Baths*</Label>
          <Button variant='input' id="area" type="text" className="w-full" placeholder="How many baths"/>
        </div>
      </div>
      <Label className="mt-6">Furnished</Label>
       <div className='flex items-center gap-x-20'>
          {["yes", "no"].map((a,i) => (
            <label 
                htmlFor={a} 
                className={` flex items-center gap-x-3 rounded-lg`}
                key={i}
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
        <SelectAminities/>

    </div>
    <div className='mt-8 flex justify-end items-center gap-x-2'>
      <Button variant='primary-outline' className="!px-12 !py-3" onClick={() => navigate(-1)}>Previous</Button>
      <Button 
      variant='primary' 
      to="/add-property/property-feature" 
      className='!px-12 !py-3'
      onClick={()=>setVisible(true)}>Submit</Button>
    </div>
    <SuccessMessage visible={visible} setVisible={setVisible}/>
    </>
  )
}

export default PropertyFeature
