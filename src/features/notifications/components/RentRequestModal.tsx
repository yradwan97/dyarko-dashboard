import React from 'react'
// import Modal from '@/app/components/Shared/Modal';
import { format } from 'date-fns';
// import Button from '@/app/components/Shared/Button';
// import Typography from "@/app/components/Shared/Typography"
// import { axiosClient as axios } from "../../services/axiosClient"
import { Button, Modal, Typography } from 'components/shared/UI';
import { axiosInstance } from 'services/axiosInstance';
import { ButtonVariant } from 'components/shared/UI/buttons';
import { NotificationProperty } from '../types/types';
import { t } from 'i18next';

interface RentRequestModalProps {
    hasARenterProperty: NotificationProperty
    onSuccess: () => void
    onFail: () => void
    setApproveRent: (_: boolean) => void
    approveRent: boolean
}


const RentRequestModal = ({ hasARenterProperty, onSuccess, onFail, setApproveRent, approveRent }: RentRequestModalProps) => {

    const handleAcceptPropertyRent = async () => {
        const userStatusBody = {
            "is_user_approved": true
        }
        handleUpdateUserStatus(userStatusBody)
    }

    const handleRejectPropertyRent = async () => {
        const userStatusBody = {
            "is_user_approved": false
        }
        handleUpdateUserStatus(userStatusBody)
    }

    const handleUpdateUserStatus = async (body: {is_user_approved: boolean}) => {
        try {
            let res = await axiosInstance.put(`/properties/${hasARenterProperty?._id}/user_status`, body)
            if (res.data.success) {
                onSuccess()
            }
        } catch (e) {
            onFail()
            console.error(e)
        }
    }
    return (
        <Modal isOpen={approveRent} onClose={() => setApproveRent(false)}>
            <Typography variant='h4' as='h4' className='text-center mb-1 text-black'>
                {t("pages.notifications.rent-request")}
            </Typography>
            <hr style={{ "backgroundColor": "black", "height": "1px", "border": "none" }} />
            <div className='flex flex-col space-y-2 my-3'>
                <div className='flex flex-row justify-between'>
                    <p>{t("pages.notifications.rent-modal.property")} </p>
                    <p className='capitalize'>{hasARenterProperty?.title}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>{t("pages.notifications.rent-modal.start-date")} </p>
                    <p className='capitalize'>{format(new Date(hasARenterProperty?.rent_details.start_date), "dd/MM/yyyy")}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>{t("pages.notifications.rent-modal.end-date")} </p>
                    <p className='capitalize'>{format(new Date(hasARenterProperty?.rent_details.end_date), "dd/MM/yyyy")}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>{t("pages.notifications.rent-modal.rent-type")} </p>
                    <p className='capitalize'>{hasARenterProperty?.rent_details.rent_type}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>{t("pages.notifications.rent-modal.code")} </p>
                    <p>{hasARenterProperty?.code}</p>
                </div>
            </div>
            <hr style={{ "backgroundColor": "black", "height": "1px", "border": "none" }} />
            <div className='flex justify-evenly mt-3'>
                <Button variant={ButtonVariant.PRIMARY} onClick={handleAcceptPropertyRent}>{t("general.accept")}</Button>
                <Button variant={ButtonVariant.PRIMARY} onClick={handleRejectPropertyRent}>{t("general.deny")}</Button>
            </div>
        </Modal>
    )
}

export default RentRequestModal