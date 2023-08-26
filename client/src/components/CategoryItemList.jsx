import React, { useEffect, useState } from "react";
import { useGetCategoryQuery } from "../state/api";
import {
  Box,
  List,
  CircularProgress,
  Typography,
  Divider,
  Paper,
  useMediaQuery,
} from "@mui/material";
import CustomListItem from "./CustomListItem";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});
const CategoryItemList = ({ items, itemsLoading, refetch }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
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

  if (categoriesLoading || itemsLoading) {
    return <CircularProgress />;
  }

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? "column" : "row"}
      justifyContent="space-around"
      gap={2}
    >
      {categories
        .filter((category) => category.total > 0)
        .map((category) => (
          <Paper
            key={category.id}
            elevation={3}
            sx={{
              minWidth: "200px",
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
            <FireNav>
              <List dense>
                {itemsFiltered
                  .filter((item) => item.category_id === category.id)
                  .map((item) => (
                    <CustomListItem
                      item={item}
                      refetchItems={refetch}
                      categoriesRefetch={categoriesRefetch}
                    />
                  ))}
                {<Divider />}
              </List>
            </FireNav>
          </Paper>
        ))}
    </Box>
  );
};

export default CategoryItemList;
