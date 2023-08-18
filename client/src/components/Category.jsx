import { Autocomplete, TextField } from "@mui/material";

import React, { useState } from "react";
import { chooseCategory } from "../state";
import { useDispatch } from "react-redux";
import { valueToPercent } from "@mui/base";

const Category = () => {
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const categories = [
    {
      id: 0,
      label: "בשר ודגים",
    },
    {
      id: 1,
      label: "ירקות ופירות",
    },
    {
      id: 2,
      label: "מוצרי ניקיון",
    },
    {
      id: 3,
      label: "מאפים ",
    },
    {
      id: 4,
      label: "מוצרי חלב ",
    },
  ];
  return (
    <div style={{ direction: "rtl" }} className="App">
      <Autocomplete
        autoHighlight
        limitTags={2}
        id="categories"
        options={categories}
        getOptionLabel={(option) => option.label || " "}
        defaultValue={[]}
        name="category"
        onChange={(event, newValue) => {
          dispatch(chooseCategory(newValue ? newValue : " "));
        }}
        style={{ direction: "rtl", width: "300px" }}
        renderInput={(params) => (
          <TextField
            style={{ direction: "rtl", marginLeft: "30px" }}
            {...params}
            label="בחר קטגוריה"
            placeholder="בחר קטגוריה"
            fullWidth
            dir="rtl"
          />
        )}
      />
    </div>
  );
};

export default Category;
