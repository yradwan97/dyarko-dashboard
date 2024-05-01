import React from 'react'
import { Outlet } from 'react-router-dom'

const BalanceContainer = () => {
  return (
    <div className="flex flex-col space-y-5">
        <Outlet />
    </div>
  )
}

export default BalanceContainer