import React, { useEffect, useState } from "react";
import { useGetCategoryQuery } from "../state/api";
import {
  Box,
  List,
  CircularProgress,
  Typography,
  Divider,
  Paper,
  Button,
} from "@mui/material";

import CustomListItem from "./CustomListItem";

const CategoryItemList = ({ items, itemsLoading, refetch }) => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch: categoriesRefetch,
  } = useGetCategoryQuery();

  const [itemsFiltered, setItemsFiltered] = useState([]);
  useEffect(() => {
    if (categories && items) {
      const filteredItems = items.filter((item) => {
        return categories.find((category) => category.id === item.category_id);
      });
      setItemsFiltered(filteredItems);
      categoriesRefetch();
    }
  }, [categories, items, categoriesRefetch]);

  if (itemsLoading || categoriesLoading) {
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
              width: "30%",
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
                  <CustomListItem
                    item={item}
                    refetchItems={refetch}
                    refetchCategories={categoriesRefetch}
                  />
                ))}
              {<Divider />}
            </List>
          </Paper>
        ))}
    </Box>
  );
};

export default CategoryItemList;
