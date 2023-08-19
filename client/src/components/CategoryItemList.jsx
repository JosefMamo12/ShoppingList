import React, { useEffect, useState } from "react";
import { useGetCategoryQuery, useGetItemsQuery } from "../state/api";
import {
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  CircularProgress,
  ListItemSecondaryAction,
  Typography,
  Divider,
  Paper
} from "@mui/material";

const CategoryItemList = ({ items, itemsLoading }) => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch: categoriesReftch,
  } = useGetCategoryQuery();

  const [itemsFiltered, setItemsFiltered] = useState([]);
  useEffect(() => {
    if (categories && items) {
      const filteredItems = items.filter((item) => {
        return categories.find((category) => category.id === item.category_id);
      });
      setItemsFiltered(filteredItems);
      categoriesReftch();
    }
  }, [categories, items]);

  if (categoriesLoading || itemsLoading) {
    return <CircularProgress />;
  }

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      {categories
        .filter((category) => category.total > 0)
        .map((category) => (
          <Paper
            key={category.id}
            elevation={3}
            sx={{
              width: "80%",
              marginBottom: 2,
              padding: 2,
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" sx={{ color: "#333" }}>
              {category.label} - {category.total} מוצרים
            </Typography>
            <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
            <List dense>
              {itemsFiltered
                .filter((item) => item.category_id === category.id)
                .map((item) => (
                  <ListItem
                    key={item.id}
                    id={item.id}
                    sx={{ borderBottom: "1px solid #A5E9C7" }}
                  >
                    <ListItemText />
                    <ListItemText primary={item.item_name} />
                    <ListItemSecondaryAction>
                      <Typography variant="body2">
                        {item.total + "x"}{" "}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              {<Divider />}
            </List>
          </Paper>
        ))}
    </Box>
  );
};

export default CategoryItemList;
