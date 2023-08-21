import {
  ListItem,
  IconButton,
  Typography,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
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
  const [addItem] = useAddItemUsingIconMutation();
  const [removeItem] = useRemoveItemUsingIconMutation();
  const dispatch = useDispatch();
  const handleAdd = () => {
    addItem({ itemId: item.id, categoryId: item.category_id });
    dispatch(incrementTotalItems());
    refetchItems();
  };
  const handleSubtract = () => {
    removeItem({
      itemId: item.id,
      categoryId: item.category_id,
      action: "remove",
    });
    dispatch(decrementTotalItems());
    refetchItems();
  };


  return (
    <ListItem
      key={item.id}
      id={item.id}
      sx={{ borderBottom: "1px solid #A5E9C7" }}
    >
      <ListItemText primary={item.item_name} />
      <IconButton
        id={item.id}
        aria-label="add"
        size="small"
        onClick={() => handleAdd()}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        id={item.id}
        aria-label="add"
        size="small"
        onClick={() => handleSubtract(item.id)}
      >
        <RemoveIcon fontSize="inherit" />
      </IconButton>
      <ListItemSecondaryAction>
        <Typography variant="body2">{item.total + "x"} </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CustomListItem;
