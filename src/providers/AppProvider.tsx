import { Loader } from "components/shared/UI";
import React, { PropsWithChildren, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "store";
import QueryProvider from "./QueryProvider";
import ToastifyProvider from "providers/ToastifyProvider";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import MuiProvider from "./MuiProvider";

const theme = extendTheme({
  colors: {
    main: {
      100: "#EDF9FD",
      200: "#C9ECFA",
      300: "#A6DFF6",
      400: "#82D3F3",
      500: "#5EC6EF",
      600: "#3DBAEC",
    },
    "main-orange": {
      100: "#FEF1ED",
      200: "#FBD4C8",
      300: "#F9B8A3",
      400: "#F79C7E",
      500: "#F47F59",
      600: "#F15A29",
    },
    "main-yellow": {
      100: "#FFF7EC",
      200: "#FEE7C5",
      300: "#FDD79F",
      400: "#FCC778",
      500: "#FBB752",
      600: "#FBB040",
    },
    black: "#000929",
    success: "#198754",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#0dcaf0",
    gray: {
      50: "#F9FAFB",
      100: "#F4F4F6",
      200: "#E5E6EB",
      300: "#D3D5DA",
      400: "#9EA3AE",
      500: "#6C727F",
      600: "#4D5461",
      700: "#394150",
      800: "#212936",
      900: "#0B0A0F",
    },
    "main-secondary": "#0009297d",
    green: "#5A9F0B",
    "main-blue": "#100A55",
    red: "#EE6A5F",
    bg: "#F5FBFC",
  }
})

function AppProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    } else {
      i18n.changeLanguage('en')
    }
  }, []);
  
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <React.Suspense fallback={<Loader />}>
      <Provider store={store}>
        <MuiProvider>
          <ChakraProvider theme={theme}>
            <QueryProvider>
              <ToastifyProvider>
                <BrowserRouter>
                  {children}
                </BrowserRouter>
              </ToastifyProvider>
            </QueryProvider>
          </ChakraProvider>
        </MuiProvider>
      </Provider>
    </React.Suspense>
  );
}

export default AppProvider;
