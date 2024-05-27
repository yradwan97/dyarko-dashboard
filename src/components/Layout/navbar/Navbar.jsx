import { axiosInstance as axios } from "services/axiosInstance";
import { useMediaQuery, useToast } from "@chakra-ui/react";

import { BiPlus } from "react-icons/bi";
import { BsFillHouseAddFill } from "react-icons/bs";
import NotificationDropdown from "./NotificationDropdown";
import Button from "components/shared/UI/buttons/Button";
import VerifyOtpModal from "components/modals/VerifyOtpModal";

import LoginDropdown from "./LoginDropdown";
import { useDispatch } from "react-redux";
import { showAddVideoModal } from "features/videos";
import {
  setSelectedPaymentOption,
  toggleActiveCreatePropertyModal,
} from "features/properties/slices/createPropertyModalSlice";
import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import LocalizationDropdown from "features/auth/components/LocalizationDropdown";
import { useTranslation } from "react-i18next";
import { closeSidebar } from "store/sidebar/sidebarSlice";

const Navbar = () => {
  const [smallScreen] = useMediaQuery("(max-width: 30em)")
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (smallScreen) {
      dispatch(closeSidebar())
    }
  }, [smallScreen]);
  
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  };
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);
  const toast = useToast({
    position: "top",
    duration: 3000,
    status: "error",
    colorScheme: "blue",
  });

  const [showVerifyAccountModal, setShowVerifyAccountModal] = useState(false);

  const checkPropertyUploadCapability = async () => {
    try {
      const { data } = await axios.get(
        "https://api.dyarko.com/properties/check"
      );
      for (const key in data) {
        if (data[key] === 0) {
          continue;
        }
        dispatch(
          setSelectedPaymentOption(
            key === "propertiesByPoints" ? "points" : "wallet"
          )
        );
        break;
      }
      if (data.propertiesByWallet <= 0 && data.propertiesByPoints <= 0)
        return toast({
          description:
            "you can not upload a property, please check your balance.",
        });
      dispatch(toggleActiveCreatePropertyModal());
    } catch (e) {
      return toast({ description: "something went wrong" });
    }
  };

  const checkVideoUploadCapability = async () => {
    try {
      const { data } = await axios.get(
        "https://api.dyarko.com/videos/upload_check"
      );
      if (data?.data?.can_upload <= 0) {
        return toast({
          description: "you can not upload a video, please check your balance.",
        });
      }
      dispatch(showAddVideoModal());
    } catch (e) {
      return toast({ description: "something went wrong" });
    }
  };

  return (
    <>
      <nav className="bg-white border-b-2 border-solid border-main-100 z-[999] relative">
        <div className="container flex justify-between items-center py-4">
          <div className="flex w-1/3  lg:w-1/2 items-center">
            <div className="hidden md:flex w-2/3">
              <LocalizationDropdown
                onSelect={handleLanguageChange}
                selectedLang={selectedLanguage}
              />
            </div>
            <span className="w-[4px] h-full bg-black/10" />
            <h4 className="hidden md:block text-black justify-start capitalize text-md font-bold">
              {t("layout.sidebar.dashboard")}
            </h4>
          </div>
          <div className="ltr:ml-auto flex items-center gap-x-2 lg:gap-x-4">
            <button
              className="w-10 h-10 bg-main-yellow-600 rounded-full flex justify-center rtl:me-2 items-center"
              onClick={async () => {
                if (!auth.user?.is_confirmed) {
                  return setShowVerifyAccountModal(true);
                }
                await checkVideoUploadCapability();
              }}
            >
              <svg
                width="23"
                height="15"
                viewBox="0 0 23 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.3842 1.97316C22.1974 1.86381 21.9848 1.80617 21.7684 1.80617C21.5519 1.80617 21.3394 1.86381 21.1525 1.97316L17.6453 3.99811V3.21606C17.6444 2.40082 17.3201 1.61923 16.7437 1.04277C16.1672 0.466305 15.3856 0.142041 14.5704 0.141113H3.0749C2.25966 0.142041 1.47808 0.466307 0.901626 1.04277C0.32517 1.61924 0.000915497 2.40082 0 3.21606L0 11.7839C0.000915497 12.5992 0.32517 13.3807 0.901626 13.9572C1.47808 14.5337 2.25966 14.8579 3.0749 14.8589H14.5701C15.3854 14.858 16.1671 14.5338 16.7436 13.9573C17.3201 13.3808 17.6444 12.5992 17.6453 11.7839V11.0018L21.1528 13.0269C21.34 13.1349 21.5524 13.1918 21.7685 13.1917C21.9847 13.1917 22.197 13.1348 22.3842 13.0267C22.5714 12.9186 22.7269 12.7631 22.835 12.5759C22.943 12.3887 23 12.1764 23 11.9602V3.03974C23.0013 2.8233 22.9449 2.61042 22.8367 2.42297C22.7285 2.23552 22.5723 2.08027 22.3842 1.97316ZM16.2075 11.7841C16.207 12.2182 16.0343 12.6344 15.7273 12.9414C15.4203 13.2484 15.0041 13.4211 14.57 13.4215H3.0749C2.64075 13.421 2.22453 13.2483 1.91756 12.9413C1.61059 12.6343 1.43794 12.2181 1.4375 11.7839V3.21606C1.43799 2.78194 1.61065 2.36574 1.91762 2.05877C2.22459 1.75179 2.64078 1.57911 3.0749 1.57861H14.5701C15.0043 1.57904 15.4206 1.75169 15.7276 2.05867C16.0346 2.36565 16.2073 2.78189 16.2078 3.21606L16.2075 11.7841ZM21.5625 11.6037L17.6453 9.34179V5.65819L21.5625 3.39629V11.6037ZM12.5602 7.49999C12.5602 7.59438 12.5416 7.68784 12.5054 7.77504C12.4693 7.86225 12.4164 7.94148 12.3496 8.00822C12.2829 8.07497 12.2037 8.12791 12.1165 8.16403C12.0293 8.20015 11.9358 8.21874 11.8414 8.21874H9.54141V10.5187C9.54141 10.7094 9.46568 10.8922 9.33089 11.027C9.1961 11.1618 9.01328 11.2375 8.82266 11.2375C8.63203 11.2375 8.44921 11.1618 8.31442 11.027C8.17963 10.8922 8.10391 10.7094 8.10391 10.5187V8.21874H5.80391C5.61328 8.21874 5.43047 8.14301 5.29567 8.00822C5.16088 7.87343 5.08516 7.69061 5.08516 7.49999C5.08516 7.30937 5.16088 7.12655 5.29567 6.99176C5.43047 6.85697 5.61328 6.78124 5.80391 6.78124H8.10391V4.48124C8.10391 4.29062 8.17963 4.1078 8.31442 3.97301C8.44921 3.83822 8.63203 3.76249 8.82266 3.76249C9.01328 3.76249 9.1961 3.83822 9.33089 3.97301C9.46568 4.1078 9.54141 4.29062 9.54141 4.48124V6.78124H11.8414C12.032 6.78124 12.2148 6.85697 12.3496 6.99176C12.4844 7.12655 12.5602 7.30937 12.5602 7.49999Z"
                  fill="white"
                />
              </svg>
            </button>
            <Button
              variant="primary"
              className="!rounded-full  flex items-center !p-2"
              onClick={async () => {
                if (!auth.user?.is_confirmed) {
                  return setShowVerifyAccountModal(true);
                }
                await checkPropertyUploadCapability();
              }}
            >
              <BsFillHouseAddFill size={20} />
              {/* <BiPlus />
              <span className="lg:flex text-sm font-bold">
                {t("layout.navbar.add-a-property")}
              </span> */}
            </Button>
            <NotificationDropdown />
            {/* ---- divider ----- */}
            <span className="w-[1px] h-full bg-black/10"></span>
            <LoginDropdown />
          </div>
        </div>
      </nav>

      {showVerifyAccountModal && (
        <VerifyOtpModal onClose={() => setShowVerifyAccountModal(false)} />
      )}
    </>
  );
};

export default Navbar;
