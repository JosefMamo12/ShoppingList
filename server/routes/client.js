import express from "express";
import { getCategories, addItem, getItems } from "../controllers/client.js";

const router = express.Router();
router.get("/categories", getCategories);
router.get("/getItems", getItems);
router.post("/addItem", addItem);

export default router;
