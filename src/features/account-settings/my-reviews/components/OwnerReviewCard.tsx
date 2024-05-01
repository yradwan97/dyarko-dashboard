import React from 'react'
import { Rating } from "@mui/material";
import { OwnerReview } from '../types/types';

interface OwnerReviewProps {
    review: OwnerReview
}

const OwnerReviewCard = ({ review }: OwnerReviewProps) => {
  return (
    <div className="flex flex-col rounded-lg p-2 border border-main-500 w-auto m-1">
        <div className="flex flex-col space-y-1 items-center justify-center">
          <img className='scale-90' src={review?.user.image} />
          <p>{review?.user.name}</p>
          <Rating name="simple-controller" value={review?.rate} readOnly />
          <p className='text-main-500'> Comment: <span className='text-black'>{review?.comment}</span></p>
          <p className='text-main-500'>Date: <span className='text-black'>{new Date(review?.createdAt).toDateString()}</span></p>
        </div>
      </div>
  )
}

export default OwnerReviewCard