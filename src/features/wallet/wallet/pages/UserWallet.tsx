import React, { SyntheticEvent, useEffect, useState } from 'react'
import WalletTable from '../components/WalletTable'
import WalletCard from '../components/WalletCard'
import { useWalletFilterReducer, WALLET_FILTER } from '../hooks/useWalletFilterReducer'
import { useGetWalletRecords } from '../hooks/query/useGetWalletRecords'
import { toastifyClient } from 'services/toastifyClient'
import { Input } from 'components/shared/form'
import { Button } from 'components/shared/UI'
import { ButtonVariant } from 'components/shared/UI/buttons'
import SelectPaymentModal from 'features/plans/components/SelectPaymentModal'
import { axiosInstance } from 'services/axiosInstance'
import { t } from 'i18next'
import Paginator from 'components/shared/pagination/Paginator'

const UserWallet = () => {
  const [filter, dispatchFilter] = useWalletFilterReducer()
  const {data, isError, isLoading, isSuccess, error} = useGetWalletRecords({filter})
  const [rechargeAmount, setRechargeAmount] = useState("")
  const [rechargeFieldVisible, setRechargeFieldVisible] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState("")

  if (isError) toastifyClient.error({ message: error?.message ?? "" });
  const handlePageChange = (page: number) => {
    console.log("page changed", page)
    dispatchFilter({ filter: WALLET_FILTER.PAGE, value: page });
  };
  const handlePayButtonClick = async (e: SyntheticEvent) => {
    setShowPaymentModal(true)
  }

  const handlePayment = async (paymentMethod: string) => {
    try {
      const { data } = await axiosInstance.post(`/wallet/recharge`, { amount: rechargeAmount, paymentMethod });
      window.open(data.data?.PayUrl, "_blank")
    } catch (e) {
      alert("something went wrong!");
    }
  }

  useEffect(() => {
    setRechargeAmount("")
  }, [rechargeFieldVisible])

  const handleFilterChange = () => {
    if (filter.type === "deduction") {
      dispatchFilter({filter: WALLET_FILTER.TYPE, value: "recharge"})
    } else {
      dispatchFilter({filter: WALLET_FILTER.TYPE, value: "deduction"})
    }
    dispatchFilter({filter: WALLET_FILTER.PAGE, value: "1"})
    setRechargeFieldVisible(false)
  }

  const handleInputChange = (e: SyntheticEvent) => {
    // @ts-ignore
    setRechargeAmount(e.target.value)
  }
  return (
    <div className="flex flex-col items-center space-y-4 lg:flex-row lg:items-start lg:gap-4 lg:space-y-0 px-4">
      <div className="lg:order-2 w-full max-w-sm">
        <WalletCard />
        {rechargeFieldVisible && <Input 
           id="recharge"
           className="mt-4"
           placeholder={t("pages.wallet.user-wallet.pay.placeholder")!}
           type="number"
           value={rechargeAmount}
           onChange={handleInputChange}
        />}
        {!rechargeFieldVisible && <Button className='w-full mt-2' onClick={() => setRechargeFieldVisible(true)}>
        {t("pages.wallet.user-wallet.recharge")!}
        </Button>}
        {rechargeFieldVisible && <Button disabled={!rechargeAmount || Number(rechargeAmount) < 1} className='w-full mt-2' onClick={handlePayButtonClick}>
        {t("pages.wallet.user-wallet.payment-button")!}
        </Button>}
        {rechargeFieldVisible && <Button className='w-full mt-2' variant={ButtonVariant.PRIMARY_OUTLINE} onClick={() => setRechargeFieldVisible(false)}>
          {t("general.cancel")}
        </Button>}
        <Button className='w-full mt-2' variant={ButtonVariant.PRIMARY} onClick={handleFilterChange}>
          {filter.type === "deduction" ? t("pages.wallet.user-wallet.all-transaction") : t("pages.wallet.user-wallet.deductions")}
        </Button>
      </div>
      <div className="w-full flex-grow">
        <WalletTable records={data?.records!} title={filter.type === "deduction" ? t("pages.wallet.user-wallet.transactions") : t("pages.wallet.user-wallet.recharge-history")} />
        <Paginator
          page={parseInt(filter.page!) || 0}
          lastPage={data?.pagesCount || 0}
          onChange={handlePageChange}
        />
      </div>
      <SelectPaymentModal onClose={() => setShowPaymentModal(false)} isOpen={showPaymentModal} onPay={(paymentMethod: string) => handlePayment(paymentMethod)} />
    </div>
  )
}

export default UserWallet