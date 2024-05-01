import { createTheme, ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import createPalette from "@mui/material/styles/createPalette";

const palette = createPalette({
  primary: {
    main: "#3DBAEC",
  },
});

const theme = createTheme({
  palette: palette,
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        page: {
          color: "white",
          boxShadow: "0px 4px 40px rgba(14, 8, 84, 0.1)",
          backgroundColor: palette.primary.main,

          ":hover": {
            color: palette.primary.main,
            backgroundColor: "white !important",
          },

          ":disabled": {
            color: palette.primary.main,
            backgroundColor: "white !important",
          },
        },
      },
    },
  },
});

function MuiProvider({children}: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MuiProvider;
