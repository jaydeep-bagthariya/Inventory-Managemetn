import express from "express";
import {
  checkOrderAvailability,
  getLowestOrderCost,
} from "../controllers/order-controller";

const router = express.Router();

router.post("/check-availability", checkOrderAvailability);
router.post("/lowest-cost", getLowestOrderCost);

export default router;
