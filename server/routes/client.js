import express from "express";
import {
  getCategories,
  addItem,
  getItems,
  getTotalItems,
  addItemUsingIcon,
  removeItemUsingIcon,
} from "../controllers/client.js";

const router = express.Router();
router.get("/categories", getCategories);
router.get("/getItems", getItems);
router.get("/getTotalItems", getTotalItems);
router.post("/addItem", addItem);
router.post("/addItemIcon", addItemUsingIcon);
router.post("/removeItemIcon", removeItemUsingIcon);

export default router;
