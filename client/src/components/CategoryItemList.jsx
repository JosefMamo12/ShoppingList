import React, { useEffect, useState } from "react";
import { useGetCategoryQuery, useGetItemsQuery } from "../state/api";
import {
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

const CategoryItemList = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoryQuery();
  const { data: items, isLoading: itemsLoading } = useGetItemsQuery();
  const [itemsFiltered, setItemsFiltered] = useState([]);
  useEffect(() => {
    if (categories && items) {
      const filteredItems = items.filter((item) => {
        return categories.find((category) => category.id === item.category_id);
      });
      setItemsFiltered(filteredItems);
    }
  }, [categories, items]);

  if (categoriesLoading || itemsLoading) {
    return <CircularProgress />;
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
    >
      {categories
        .filter((category) => category.total > 0)
        .map((category) => (
            <List
              key={category.id}
              sx={{}}
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    fontSize: "20px",
                    height: "60px", // Adjust this height as needed
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {category.label + " - " + category.total + " מוצרים"}
                </ListSubheader>
              }
            >
              {
              itemsFiltered
                .filter((item) => item.category_id === category.id)
                .map((item) => (
                  <ListItem key={item.id} id={item.id}>
                    <ListItemText
                      primary={item.item_name + " " + item.total + "x"}
                    />
                  </ListItem>
                ))}
            </List>
        ))}
    </Box>
  );
};

export default CategoryItemList;
