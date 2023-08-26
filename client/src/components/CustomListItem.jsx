import {
  ListItem,
  IconButton,
  Typography,
  ListItemSecondaryAction,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  useAddItemUsingIconMutation,
  useRemoveItemUsingIconMutation,
} from "../state/api";
import {
  incrementTotalItems,
  decrementTotalItems,
} from "../state/totalItemsSlice";

const CustomListItem = ({ item, refetchItems }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addItem] = useAddItemUsingIconMutation();
  const [removeItem] = useRemoveItemUsingIconMutation();
  const dispatch = useDispatch();
  const handleAdd = () => {
    setIsAdding(true);
    addItem({ itemId: item.id, categoryId: item.category_id }).then(() => {
      refetchItems();
      dispatch(incrementTotalItems());
      setIsAdding(false);
    });
  };
  const handleSubtract = () => {
    console.log(item);
    setIsRemoving(true);
    removeItem({
      itemId: item.id,
      categoryId: item.category_id,
      action: "remove",
    }).then(() => {
      refetchItems();
      dispatch(decrementTotalItems());
      setIsRemoving(false);
    });
  };

  return (
    <ListItem
      key={item.id}
      id={item.id}
      sx={{ borderBottom: "1px solid #A5E9C7" }}
    >
      <ListItemText primary={item.item_name} />
        <IconButton
          aria-label="add"
          size="small"
          onClick={() => handleAdd()}
          disabled={isAdding}
        >
          {isAdding ? <CircularProgress /> : <AddIcon fontSize="inherit" />}
        </IconButton>
      <IconButton
        aria-label="add"
        size="small"
        onClick={() => handleSubtract(item)}
        disabled={isRemoving}
      >
        {isRemoving ? <CircularProgress /> : <RemoveIcon fontSize="inherit" />}
      </IconButton>
  
      <ListItemSecondaryAction>
        <Typography variant="body2">{item.total + "x"} </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CustomListItem;
