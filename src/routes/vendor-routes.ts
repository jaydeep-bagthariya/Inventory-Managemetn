import express from "express";
import {
  updateStockPrice,
  bulkUpdateStockPrice,
} from "../controllers/vendor-controller";

const router = express.Router();

router.put("/apparel", updateStockPrice);
router.put("/apparel/bulk", bulkUpdateStockPrice);

export default router;
