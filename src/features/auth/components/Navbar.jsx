import logo from "assets/images/logo.png";
import LocalizationDropdown from "./LocalizationDropdown";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  
  const handleLanguageChange = (language) => {
    // if (language !== i18n.language) window.history.go(0)
    setSelectedLanguage(language);
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  };
  return (
    <div className="container hidden border-b border-main-100 py-6 lg:flex justify-between">
      <img src={logo} alt="logo" />
      <LocalizationDropdown selectedLang={selectedLanguage} onSelect={handleLanguageChange} />
    </div>
  );
};

export default Navbar;
