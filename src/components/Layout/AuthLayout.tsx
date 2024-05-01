import Sidebar from "components/Layout/sidebar/Sidebar";
import Navbar from "components/Layout/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { initSidebar } from "store/sidebar/sidebarSlice";
import { useEffect, useMemo, useState } from "react";
import { AddVideoModal, initAddVideoModal } from "features/videos";
import { AddPropertyModal, EditPropertyModal } from "features/properties";
import { verify } from "features/auth/services/authSlice";
import { ROUTES } from "configs/routes";
import { Loader, Spinner } from "components/shared/UI";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const AuthLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector(state => state.sidebar);
  const {i18n} = useTranslation()
  const [authVerified, setAuthVerified] = useState(false);
  const isRTL = useMemo(() => i18n.language === "ar", [i18n.language])
  const containerClasses = () => {
    if (isRTL && sidebar.isActive) {
      return "mr-[80px]"
    } else if (isRTL && !sidebar.isActive) {
      return "mr-[250px]"
    } else if (!isRTL && sidebar.isActive) {
      return "ml-[80px]"
    } else {
      return "ml-[250px]"
    }
  }
  useEffect(() => {
    dispatch(verify())
      .unwrap()
      .then(_ => {
        setAuthVerified(true);
      }).catch(_ => {
        navigate(ROUTES.LOGIN)
      })
  }, [dispatch])

  return authVerified  ? (
    <div className="h-screen">
      <AddVideoModal />
      <AddPropertyModal />
      <EditPropertyModal />
      <Sidebar />
      <div
        className={`${containerClasses()} bg-bg duration-500`}
      >
        <Navbar />
        <main className="container h-[calc(100vh_-_6.125rem)] overflow-y-auto py-7">
          <Outlet />
        </main>
      </div>
    </div>
  ) 
  : 
  <h1>{t("auth.verifying")}</h1>
};

export default AuthLayout;
