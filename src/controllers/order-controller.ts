import { Request, Response } from "express";
import { readInventory } from "../utils/index";
import {
  checkOrderAvailabilitySchema,
  getLowestOrderCostSchema,
} from "../validations";
import { errorResponse, successResponse } from "../utils/response";

// Check order fulfillment
export const checkOrderAvailability = (req: Request, res: Response): any => {
  const validation = checkOrderAvailabilitySchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json(
        errorResponse("Invalid request payload", validation.error.format())
      );
  }

  const { order: orderItems } = req.body;
  const inventory = readInventory();

  let canFulfill = true;
  const missingItems = [];

  for (const item of orderItems) {
    const found = inventory.find(
      (apparel) =>
        apparel.apparelCode === item.apparelCode && apparel.size === item.size
    );

    if (!found || found.stock < item.quantity) {
      canFulfill = false;
      missingItems.push({
        apparelCode: item.apparelCode,
        size: item.size,
        needed: item.quantity,
        available: found ? found.stock : 0,
      });
    }
  }

  if (canFulfill) {
    res.json(successResponse("Order can be fulfilled", { canFulfill }));
  } else {
    res.status(200).json(
      errorResponse("Order can't be fulfilled", {
        canFulfill: false,
        missingItems,
      })
    );
  }
};

// Get the lowest cost to fulfill an order
export const getLowestOrderCost = (req: Request, res: Response): any => {
  const validation = getLowestOrderCostSchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json(
        errorResponse("Invalid request payload", validation.error.format())
      );
  }

  const { order: orderItems } = req.body;
  const inventory = readInventory();

  let totalCost = 0;
  let breakdown = [];
  for (const item of orderItems) {
    const found = inventory.find(
      (apparel) =>
        apparel.apparelCode === item.apparelCode && apparel.size === item.size
    );
    if (!found || found.stock < item.quantity) {
      return res
        .status(400)
        .json(
          errorResponse("Order cannot be fulfilled due to insufficient stock")
        );
    }
    const cost = found.price * item.quantity;
    totalCost += cost;
    breakdown.push({
      apparelCode: item.apparelCode,
      size: item.size,
      quantity: item.quantity,
      unitPrice: found.price,
      totalPrice: cost,
    });
  }
  return res
    .status(200)
    .json(successResponse("Oder can be fulfilled", { totalCost, breakdown }));
};
