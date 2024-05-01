import React from 'react'
import { Typography } from 'components/shared/UI'
import VerifiedCheck from 'components/shared/icons/VerifiedCheck'
import Navbar from 'features/auth/components/Navbar'
import { t } from 'i18next'

const ConfirmPageContents = () => {
    return (
        <>
        <Navbar />
        <div className='flex flex-col border items-center h-96 justify-center rounded-lg space-y-4 mt-3 border-gray-300 px-8 pb-8 pt-2'>
            <VerifiedCheck />
            <Typography className='text-center' as='h2' variant='h2'>
                {t("auth.confirm-email")}
            </Typography>
            <Typography className='text-center' as="p" variant='body-md-medium'>
                {t("auth.confirm-email-message")}
            </Typography>
        </div>
        </>
    )
}

export default ConfirmPageContents