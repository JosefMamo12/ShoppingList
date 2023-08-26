import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Header = ({ title }) => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      height="10vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="2px solid green"
      borderRadius="30px"
      backgroundColor={theme.palette.primary.main}
      marginBottom="20px"
      boxShadow="0px 5px 10px rgba(0, 0, 0, 0.1)" // Add a subtle box shadow
    >
      <Typography variant="h4" component="h2" color="white">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
