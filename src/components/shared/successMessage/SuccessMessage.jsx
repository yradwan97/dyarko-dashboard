import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import Overlay from '../overlay'
import {IoMdCheckmark} from 'react-icons/io'
import { Typography, Button } from "components/shared/UI";
import frame from '../../../assets/images/diarko-frame.png'


function SuccessMessage(props) {
    const {visible, setVisible} = props
  return (
    <Overlay visible={visible} setVisible={setVisible}>
        <Dialog.Panel className='bg-white w-8/12 p-12 mx-auto flex flex-col items-center'>
            <div className='relative'>
                <img src={frame} className="w-[136px]" alt=""/>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300 delay-100"
                    enterFrom="opacity-0 scale-50"
                    enterTo="opacity-100 scale-100"
                    >
                    <div className='h-16 w-16 rounded-full bg-green flex justify-center items-center absolute bottom-0 translate-y-1/2 right-7'>
                        <IoMdCheckmark className="text-white text-4xl"/>
                    </div>
                </Transition.Child>
            </div>
            <Typography variant='h2' as="h2" className='text-black mt-12 md:w-7/12 mx-auto'>Your property has been posted successfully</Typography>
            <Button variant='primary' to="/" className="font-bold !px-12 mt-6">Back to dashboard</Button>
        </Dialog.Panel>
    </Overlay>
  )
}

export default SuccessMessage
