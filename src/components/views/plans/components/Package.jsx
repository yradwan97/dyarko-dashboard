import React from 'react'
import { Typography } from 'components/shared/UI'
import PackagePrice from './PackagePrice'
import PackagPoint from './PackagPoint'
import PlanIcon from './PlanIcon'
import SubscribeButton from './SubscribeButton'

function Package(props) {
  const {packageType} = props
  return (
    <>
        <div className='bg-white border border-white hover:bg-main-100 hover:border-main-600 rounded-lg flex-1 p-4'>
          <PlanIcon background={
            packageType === 'golden' ? 'bg-main-yellow-600': 
            packageType === 'sliver' ? 'bg-[#C0C0C0]':
            'bg-[#CD7F32]'
          }/>
            <Typography variant='body-lg-bold' as='h4' className='text-gary-900 capitalize my-3'>{packageType}</Typography>
            <PackagePrice/>
            <div className='my-8 space-y-6'>
                <PackagPoint disable={false}/>
                <PackagPoint disable={false}/>
                <PackagPoint disable={false}/>
                <PackagPoint disable={false}/>
                <PackagPoint disable={false}/>
                <PackagPoint disable={true}/>
                <PackagPoint disable={true}/>
            </div>
            <SubscribeButton/>
        </div>
    </>
  )
}

export default Package
