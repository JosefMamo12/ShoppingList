import { useTheme } from "@emotion/react";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, color } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddItemMutation } from "../state/api";
import { incrementTotalItems } from "../state/totalItemsSlice";
import Category from "./Category";

const Search = ({ refetchItems }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [text, setText] = useState("");
  const [addItemFlag, setAddItemFlag] = useState(false);
  const [addItem] = useAddItemMutation();

  const selectedCategory = useSelector(
    (state) => state.persistedReducer.category.value
  );
  const selectedTotalItems = useSelector(
    (state) => state.persistedReducer.totalItems.value
  );

  const handleClick = () => {
    if (!text || !selectedCategory) {
      console.log("Please fill both fields");
    } else {
      setAddItemFlag(true);
      addItem({
        itemName: text.trim(),
        categoryId: selectedCategory.id,
      })
        .then(() => {
          setAddItemFlag(false);
          dispatch(incrementTotalItems());
          refetchItems();
          setText(""); // Clear the input field after adding an item
        })
        .catch((error) => {
          console.error("Error adding item: ", error);
        });
    }
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems="center"
        justifyContent="center"
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
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            borderRadius: "10px",
            color: "white",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
            border: "2px solid green",
          }}
          color="primary"
          disabled={addItemFlag}
        >
          {addItemFlag ? <CircularProgress /> : "הוסף מוצר"}
        </Button>
      </Box>
      <Box mt="10px">
        <Typography variant="h6">סה"כ מוצרים: {selectedTotalItems}</Typography>
      </Box>
    </Box>
  );
};

export default Search;
