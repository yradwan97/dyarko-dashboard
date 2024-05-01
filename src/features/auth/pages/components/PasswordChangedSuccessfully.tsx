import React from 'react'
import { Button, Modal, Typography } from 'components/shared/UI'
import { ButtonVariant } from 'components/shared/UI/buttons'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'configs/routes'
import { t } from 'i18next'

interface PasswordChangedProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const PasswordChangedSuccessfully = ({visible, setVisible} : PasswordChangedProps) => {
  const navigate = useNavigate()
  return (
    <Modal isOpen={visible} onClose={setVisible} allowCloseBtn={false }>
      <div className='relative w-full md:w-[500px] lg:w-[824px] mx-auto bg-white rounded-lg m-6 py-10 md:py-20 px-4 flex flex-col justify-center items-center'>
        <div className='w-8/12 sm:w-1/2 lg:w-4/12 h-[160px] bg-cover bg-center rounded-lg flex justify-center items-center'>
          <Typography variant='h3' as='h3' className="text-black my-6 text-center">{t("auth.password-changed")}</Typography>
        </div>
        <Typography variant='body-md-medium' as='p' className="text-gray-500 md:w-8/12 lg:w-[35%] text-center">{t("auth.password-changed-message")} </Typography>
        <Button variant={ButtonVariant.PRIMARY} className="w-full sm:w-1/2 md:w-4/12 mt-12" onClick={() => {
          setVisible(!visible)
          navigate(ROUTES.LOGIN)
        }}>Okay</Button>
      </div>
    </Modal>
  )
}

export default PasswordChangedSuccessfully