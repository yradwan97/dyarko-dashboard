import React, { useState } from 'react'
import Label from '../label/Label';
import { Typography } from "components/shared/UI";

function SelectAminities() {
  const [values, setValues] = useState([
    {
      id:1,
      name:'A/C',
      checked: true
    },
    {
      id:2,
      name:'Deck',
      checked: false
    },
    {
      id:3,
      name:'Pet Friendly',
      checked: false
    },
    {
      id:4,
      name:'Pool',
      checked: false
    },
    {
      id:5,
      name:'Yard',
      checked: false
    },
    {
      id:6,
      name:'Free Wi-Fi',
      checked: false
    },
    {
      id:7,
      name:'Gym',
      checked: false
    },
    {
      id:8,
      name:'Hardwood Floor',
      checked: false
    },
    {
      id:9,
      name:'Jacuzzi',
      checked: false
    }
  ])
  const updateValues = (id, isChecked) => {
    console.log('target', isChecked)
    setValues(
      values.map((val) => {
        if (val.id === id) {
          return { ...val, checked:isChecked };
        } else {
          return val;
        }
      })
    );     
  }

  return (
    <div>
        <Label className="mt-6">SelectAminities</Label>
        <div className='flex flex-wrap gap-3'>
        {values ? values.map(({id, name, checked})=>(

        <div 
          className={ `${checked ? 
          'border-main-300 bg-main-100 text-main-600' : 'border-gray-200 text-black/70'}
          relative border-2 rounded-lg py-2 px-4`} key={id}>
          <Typography variant='body-md-medium' as='span'>{name}</Typography>
          <input 
          className={`absolute inset-0 appearance-none`}
          type='checkbox' 
          onChange={(e)=>updateValues(id, e.target.checked)}
          />
          
        </div>
        ))
        : null}
        </div>
        <button className='mt-6'>
          <Typography 
          variant='body-md-bold' 
          as='span' 
          className="text-main-600">+ Add amenity</Typography>
        </button>
        <input type='text'/>
    </div>
  )
}

export default SelectAminities
