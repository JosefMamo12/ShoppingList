import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  Button,
  createTheme,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { green } from "@mui/material/colors";
import Category from "./components/Category";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CategoryItemList from "./components/CategoryItemList";
import { useDispatch, useSelector } from "react-redux";
import { useAddItemMutation, useGetItemsQuery } from "./state/api";
import { incrementTotalItems, restartSignal } from "./state/totalItemsSlice";
import image from "./img/15687.jpg";
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

  const [text, setText] = useState("");
  const {
    data: items,
    isLoading: itemsLoading,
    refetch: refetchItems,
  } = useGetItemsQuery();

  const selectedCategory = useSelector(
    (state) => state.persistedReducer.category.value
  );
  const selectedTotalItems = useSelector(
    (state) => state.persistedReducer.totalItems.value
  );
  const [addItem] = useAddItemMutation();

  const handleClick = () => {
    if (!text || !selectedCategory) {
      console.log("Please fill both fields");
    } else {
      addItem({
        itemName: text.trim(),
        categoryId: selectedCategory.id,
      });
      dispatch(incrementTotalItems());
      refetchItems();
      setText(""); // Clear the input field after adding an item
    }
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="App"
        style={{
          direction: "rtl",
          backgroundImage: `url('${image}')`,
          height: "100vh",
        }}
      >
        <CacheProvider value={cacheRtl}>
          <Box
            width="100%"
            maxWidth={isSmallScreen ? "100%" : "70%"}
            mx="auto" // Center the container horizontally
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center" // Center the container vertically
            minHeight="50vh"
            padding="20px"
          >
            <Box
              width="70%"
              height="10vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              border="2px solid white"
              borderRadius="30px"
              backgroundColor={theme.palette.primary.main}
              marginBottom="20px"
              marginTop="50px"
              boxShadow="0px 5px 10px rgba(0, 0, 0, 0.1)" // Add a subtle box shadow
            >
              <Typography variant="h4" component="h2" color="white">
                רשימת קניות
              </Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
              gap={2} // Add some space between elements
            >
              <TextField
                id="outlined"
                variant="outlined"
                dir="rtl"
                label="רשום מוצר"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Category />
              <Button onClick={handleClick} variant="contained" color="primary">
                הוסף
              </Button>
            </Box>
            <Box marginTop={2} marginBottom={2} display="flex" justifyContent="space-between" >
              <Typography variant="h6">
                סה"כ מוצרים: {selectedTotalItems}
              </Typography>
              <Button variant="text" onClick={() => dispatch(restartSignal())}>
                אפס
              </Button>
            </Box>
            <Box
              className="lists container"
              width="100%"
              minHeight="100px"
              padding={2}
              borderRadius="10px"
              backgroundColor={theme.palette.background.main}
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" // Add a subtle box shadow
            >
              <Typography variant="h5" color="primary" marginBottom={2}>
                מוצרים ברשימה
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <CategoryItemList
                items={items}
                itemsLoading={itemsLoading}
                refetch={refetchItems}
              />
            </Box>
          </Box>
        </CacheProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;