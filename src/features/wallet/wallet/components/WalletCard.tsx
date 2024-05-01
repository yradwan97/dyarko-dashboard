import { Typography } from 'components/shared/UI'
import { useAppSelector } from 'hooks'
import { t } from 'i18next'
import React from 'react'

const WalletCard = () => {
  const auth = useAppSelector(state => state.auth)
  return (
    <div className="bg-points bg-cover bg-center bg-no-repeat h-56 rounded-lg">
      <div className="w-full h-full backdrop-blur-[2px] flex flex-col justify-center items-center space-y-4 rounded-lg">
        <Typography variant="body-md" as="span" className="text-white">
          {t("pages.wallet.user-wallet.total-balance")}
        </Typography>
        <Typography variant="h3" as="h4" className="text-black">
          {`${auth?.user.wallet.toFixed(2) || 0}`} {t("general.dinar")}
        </Typography>
      </div>
    </div>
  )
}

export default WalletCard