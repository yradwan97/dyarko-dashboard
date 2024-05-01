import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// const Dashboard = lazy(() => import("features/dashboard/components/Dashboard"));
// const InstallmentRequests = lazy(() => import("features/requests/installment-requests/pages/InstallmentRequests"))

import Login from "features/auth/pages/Login";
import SignUp from "features/auth/pages/SignUp";
import { InstallmentRequests } from "features/requests/installment-requests";
import Dashboard from "features/dashboard/components/Dashboard"
import ForgetPassword from "features/auth/pages/ForgetPassword";
import AuthLayout from "components/Layout/AuthLayout";
import { ROUTES } from "configs/routes";
import { Properties, PropertyDetails } from "features/properties";
import { AddVideoModal, VideoDetails, Videos } from "features/videos";
import Rating from "components/views/rating/Rating";
import ChooseProperty from "components/views/chooseProperty/ChooseProperty";
import AddProperty from "components/views/addProperty";
import BuyingOption from "components/views/buyingOption";
import AddPropertDetails from "components/views/addPropertyDetails";
import PropertyFeature from "components/views/propertyFeature";
import { Requests } from "features/requests";
import { TourRequests } from "features/requests/tour-requests";
import { Reports } from "features/reports";
import Contracts from "features/contracts/pages/Contracts";
import RentContracts from "features/contracts/rentContracts/pages/RentContracts";
import { MyRealEstates, PropertyInvoices } from "features/invoices";
import { CheckRemaining, Plans } from "features/plans";
import {
  AccountSettings,
  AvailableTime,
  ChangePassword,
  MyAccount,
  Profile,
} from "features/account-settings";
import Help from "components/views/help/Help";
import CustomerSupport from "components/views/customerSupport/CustomerSupport";
import { Balance, Points, Wallet } from "features/wallet";
import BankAccount from "features/account-settings/bankAccount/pages/BankAccount";
import DyarkoTransactions from "features/wallet/balance/dyarko-transactions/pages/DyarkoTransactions";
import UserTransactions from "features/wallet/balance/user-transactions/pages/UserTransactions";
import BalanceContainer from "features/wallet/balance/pages/BalanceContainer";
import UserWallet from "features/wallet/wallet/pages/UserWallet";
import MyReviews from "features/account-settings/my-reviews/pages/MyReviews";
import MyRefundPolicies from "features/account-settings/my-refund-policies/pages/MyRefundPolicies";
import ResetPassword from "features/auth/pages/ResetPassword";
import Notifications from "features/notifications/pages/Notifications";
import ConfirmEmail from "features/auth/pages/components/ConfirmEmail"

const Navigations = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      <Route path={ROUTES.FORGET_PASSWORD} element={<ForgetPassword />} />
      <Route path={ROUTES.CONFIRM_EMAIL} element={<ConfirmEmail />} />
      <Route path={`${ROUTES.RESET_PASSWORD}/:tempToken`} element={<ResetPassword />} />
      <Route element={<AuthLayout />}>
        <Route index element={<Navigate to={ROUTES.PROPERTIES} />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />}>
          <Route index element={<Navigate to={ROUTES.PROPERTIES} />} />
          <Route path={ROUTES.PROPERTIES} element={<Properties />} />
          <Route
            path={`${ROUTES.PROPERTIES_DETAILS}/:id`}
            element={<PropertyDetails />}
          />
          <Route path={ROUTES.VIDEOS} element={<Videos />} />
          <Route
            path={`${ROUTES.VIDEO_DETAILS}/:id`}
            element={<VideoDetails />}
          />
        </Route>
        <Route path={ROUTES.ADD_VIDEO} element={<AddVideoModal />} />
        <Route path={ROUTES.RATING} element={<Rating />} />
        <Route path={ROUTES.CHOOSE_PROPERTY} element={<ChooseProperty />} />
        <Route path={ROUTES.ADD_PROPERTY} element={<AddProperty />}>
          <Route index element={<BuyingOption />} />
          <Route path={ROUTES.ADD_PROPERTY_DETAILS} element={<AddPropertDetails />} />
          <Route path={ROUTES.BUYING_OPTIONS} element={<BuyingOption />} />
          <Route path={ROUTES.PROPERTY_FEATURE} element={<PropertyFeature />} />
        </Route>
        <Route path={ROUTES.WALLET} element={<Wallet />}>
        <Route index element={<Navigate to={ROUTES.BALANCE_CONTAINER} />} />
          <Route path={ROUTES.BALANCE_CONTAINER} element={<BalanceContainer />}>
          <Route index element={<Navigate to={ROUTES.BALANCE} />} />
            <Route index path={ROUTES.BALANCE} element={<Balance />} /> 
            <Route path={ROUTES.DYARKO_TRANSACTION} element={<DyarkoTransactions />} />
            <Route path={ROUTES.USER_TRANSACTION} element={<UserTransactions />} />
          </Route>
          <Route path={ROUTES.POINTS} element={<Points />} />
          <Route path={ROUTES.USER_WALLET} element={<UserWallet />} />
        </Route>
        <Route path={ROUTES.REQUESTS} element={<Requests />}>
          <Route index element={<Navigate to={ROUTES.TOUR_REQUESTS} />} />
          <Route path={ROUTES.TOUR_REQUESTS} element={<TourRequests />} />
          <Route
            path={ROUTES.INSTALLMENT_REQUESTS}
            element={<InstallmentRequests />}
          />
        </Route>
        <Route path={ROUTES.REPORTS} element={<Reports />} />
        <Route path={ROUTES.CONTRACTS} element={<Contracts />}>
          <Route index element={<Navigate to={ROUTES.RENT_CONTRACTS} />} />
          <Route path={ROUTES.RENT_CONTRACTS} element={<RentContracts />} />
        </Route>
        <Route path={ROUTES.MY_REAL_ESTATE} element={<MyRealEstates />} />
        <Route
          path={`${ROUTES.PROPERTY_INVOICES}/:id`}
          element={<PropertyInvoices />}
        />
        <Route path={ROUTES.PLANS}>
          <Route path={ROUTES.CHECK_REMAINING} element={<CheckRemaining />} />
          <Route index element={<Plans />} />
        </Route>
        <Route path={ROUTES.ACCOUNT_SETTINGS} element={<AccountSettings />}>
          <Route index element={<Navigate to={ROUTES.PROFILE} />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.MY_ACCOUNT} element={<MyAccount />} />
          <Route path={ROUTES.BANK_ACCOUNT} element={<BankAccount />} />
          <Route path={ROUTES.AVAILABLE_TIME} element={<AvailableTime />} />
          <Route path={ROUTES.REVIEWS} element={<MyReviews />} />
          <Route path={ROUTES.REFUND_POLICY} element={<MyRefundPolicies />} />
        </Route>
        <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={ROUTES.HELP} element={<Help />} />
        <Route path={ROUTES.CUSTOMER_SUPPORT} element={<CustomerSupport />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default Navigations;
