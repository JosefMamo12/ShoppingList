import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { green } from "@mui/material/colors";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useDispatch } from "react-redux";
import { useGetItemsQuery } from "./state/api";
import { restartSignal } from "./state/totalItemsSlice";
import background from "./img/background.png";
import Header from "./components/Header";
import Search from "./components/Search";
import ListsContainer from "./components/ListsContainer";
import logo from "./img/logo.png";

function App() {
  const dispatch = useDispatch();
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [stylisRTLPlugin],
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: green[500], // Use green color as the primary color
      },
      secondary: {
        main: "#f44336",
      },
      background: {
        main: "#f0f5f1", // A light background color
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif", // Change the font family
    },
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data: items,
    isLoading: itemsLoading,
    refetch: refetchItems,
  } = useGetItemsQuery();

  useEffect(() => {
    if (items && items.length === 0) {
      console.log("Restart Signal Dispatched");
      console.log(isSmallScreen);
      dispatch(restartSignal());
    }
  }, [dispatch, items, isSmallScreen]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="App"
        style={{
          direction: "rtl",
        }}
      >
        <CacheProvider value={cacheRtl}>
          <Box sx={{ background: `url(${background})`, margin: 0, padding:0 }}>
            <img src={logo} alt="Logo" width="250px" height="200px" />

            <Box
              mx="auto" // Center the container horizontally
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
              }}
              p={2} // Add padding for spacing
            >
              <Box width="50%">
                <Header title="רשימת קניות" />
                <Search refetchItems={refetchItems} />
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" padding="15px">
            <ListsContainer
              items={items}
              itemsLoading={itemsLoading}
              refetchItems={refetchItems}
            />
          </Box>
        </CacheProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
