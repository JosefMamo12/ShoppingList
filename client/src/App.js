import React, { useState } from "react";
import {
  TextField,
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  Button,
  createTheme,
  Input,
} from "@mui/material";
import { green } from "@mui/material/colors";
import Category from "./components/Category";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CategoryItemList from "./components/CategoryItemList";
import { useSelector } from "react-redux";
import { useAddItemMutation } from "./state/api";

function App() {
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
  });

  const [text, setText] = useState("");
  const selectedCategory = useSelector((state) => state.category.value);
  const [addItem, addItemResult] = useAddItemMutation();

  const handleClick = () => {
    // if (!text || !selectedCategory) {
    //   console.log("Please fill both of the fields");
    // } else {
    console.log(text + " " + selectedCategory.id);
    addItem({
      itemName: text,
      categoryId: selectedCategory.id,
    });
    // }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{ direction: "rtl" }}>
        <CacheProvider value={cacheRtl}>
          <Box
            mx="auto" // Center the container horizontally
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center" // Center the container vertically
            minHeight="50vh"
            backgroundColor={theme.palette.background.main}
            padding="20px"
          >
            <Box
              width="100%"
              height="200px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              border="2px solid white"
              borderRadius="30px"
              backgroundColor={theme.palette.primary.main}
              marginBottom="20px"
            >
              <Typography variant="h1" component="h2" color="white">
                רשימת קניות
              </Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Box padding="10px">
                <TextField
                  id="outlined"
                  variant="outlined"
                  dir="rtl"
                  label="רשום מוצר"
                  onChange={(e) => setText(e.target.value)}
                ></TextField>
              </Box>
              <Box padding="10px">
                <Category />
              </Box>
              <Button onClick={handleClick} variant="contained" color="primary">
                הוסף
              </Button>
            </Box>
            <Box
              padding="100px"
              className="lists container"
              width="100%"
              minHeight="100px"
            >
              <CategoryItemList />
            </Box>
          </Box>
        </CacheProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
