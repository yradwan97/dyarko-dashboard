import React, { useEffect, useState } from "react";
import { Tabs } from "components/shared/UI";
import { ROUTES } from "configs/routes";
import { Outlet } from "react-router-dom";
import { BsQuestion } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { useGetUserWalletQuestionMarkInfo, useGetWalletQuestionMarkInfo } from "../hooks/query/useGetWalletQuestionMarkInfo";
import { BALANCE_TRANSACTIONS_URLS } from "../balance/services/api/urls";
import QuestionMarkInfoModal from "../components/QuestionMarkInfoModal"
import { useDisclosure } from "@chakra-ui/react";
import WalletQuestionMarkModal from "../components/WalletQuestionMarkModal";

const tabs = [
  {
    text: "balance",
    uri: ROUTES.BALANCE_CONTAINER
  },
  {
    text: "wallet",
    uri: ROUTES.USER_WALLET
  },
  {
    text: "points",
    uri: ROUTES.POINTS
  }
];

function Wallet() {
  const location = useLocation()
  // const [isOpen, setIsOpen] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isWalletQuestionMarkOpen, onClose: onWalletQuestionMarkClose, onOpen: onWalletQuestionMarkOpen } = useDisclosure()
  const [selectedTab, setSelectedTab] = useState("balance")
  const { data, isSuccess, isLoading, refetch } = useGetWalletQuestionMarkInfo(selectedTab)
  const {data: userWalletInfo, isSuccess: isUserWalletSuccess} = useGetUserWalletQuestionMarkInfo()
  useEffect(() => {
    console.log(selectedTab)
    refetch()
  }, [selectedTab])

  useEffect(() => {
    handleGetWalletInfo()
  }, [location])

  const handleGetWalletInfo = () => {
    const selectedTab = location.pathname.substring(location.pathname.lastIndexOf("/")).replace("/", "")

    switch (selectedTab) {
      case "balance":
        setSelectedTab("balance")
        break
      case "user-wallet":
        setSelectedTab("user-wallet")
        break
      case "points":
        setSelectedTab("points")
        break
    }
  }
  const getQuestionMarkBackground = () => {
    const selectedTab = location.pathname.substring(location.pathname.lastIndexOf("/")).replace("/", "")
    switch (selectedTab) {
      case "balance":
        return "bg-main-600"
      case "user-wallet":
        return "bg-main-600"
      case "points":
        return "bg-main-yellow-600"
    }
  }
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row items-center justify-between">
        <Tabs tabs={tabs} />
        <span onClick={() => {
          selectedTab === "user-wallet" ? onWalletQuestionMarkOpen() : onOpen()
        }} className={`mr-4 ${getQuestionMarkBackground()} w-9 h-9 rounded-full ${(isSuccess || isUserWalletSuccess) ? "cursor-pointer" : isLoading ? "cursor-wait" : "cursor-default"} flex justify-center items-center`}>
          <BsQuestion className="text-white text-2xl rtl:reflect-y" />
        </span>
      </div>
      {selectedTab !== "user-wallet" && <QuestionMarkInfoModal isOpen={isOpen} info={data} className="w-3/4" onClose={onClose} />}
      {isUserWalletSuccess && <WalletQuestionMarkModal isOpen={isWalletQuestionMarkOpen} className="w-1/3" onClose={onWalletQuestionMarkClose} info={userWalletInfo}/>}
      <Outlet />
    </div>
  );
}

export default Wallet;
