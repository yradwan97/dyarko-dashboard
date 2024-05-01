import AppProvider from "providers/AppProvider";
import Navigations from "components/navigations/Navigations";
import { LoadScript } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const App = () => {
  // added the block below in order to force a rerender of the entire app once the language changes in order to clear any chached i18n values
  
  const {i18n} = useTranslation()
  const [, forceUpdate] = useState(true)
  useEffect(() => {
    i18n.on("languageChanged", () => forceUpdate(prev => !prev))
    return () => {
      // Clean up event listener
      i18n.off("languageChanged", () => forceUpdate(prev => !prev));
    }
  }, [i18n]);
  
  return (
    <AppProvider>
      <LoadScript googleMapsApiKey="AIzaSyCfmaLMG97CL384JSYJxq-Nkg2m4DRvfIE">
        <Navigations />
      </LoadScript>
    </AppProvider>
  );
};

export default App;
