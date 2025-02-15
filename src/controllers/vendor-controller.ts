import { Apparel } from "../model";

import { Request, Response } from "express";
import { readInventory, writeInventory } from "../utils";
import {
  bulkUpdateStockPriceSchema,
  updateStockPriceSchema,
} from "../validations";
import { errorResponse, successResponse } from "../utils/response";

// Update stock & price for one apparel
export const updateStockPrice = (req: Request, res: Response): any => {
  const validation = updateStockPriceSchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json(
        errorResponse("Invalid request payload", validation.error.format())
      );
  }

  const { apparelCode, size, stock, price } = req.body;
  let inventory = readInventory();

  const item = inventory.find(
    (apparel) => apparel.apparelCode === apparelCode && apparel.size === size
  );

  if (!item) {
    return res.status(400).json(errorResponse("Item not found"));
  }

  item.stock = stock;
  item.price = price;
  writeInventory(inventory);

  return res.status(200).json(successResponse("Stock & price updated", item));
};

// Bulk update stock & price
export const bulkUpdateStockPrice = (req: Request, res: Response): any => {
  const validation = bulkUpdateStockPriceSchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json(
        errorResponse("Invalid request payload", validation.error.format())
      );
  }

  const updates: Apparel[] = req.body.updates;

  // Validate request format
  if (!updates || !Array.isArray(updates)) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  let inventory = readInventory();

  // Find all invalid apparel codes
  const invalidItems = updates.filter(
    ({ apparelCode, size }) =>
      !inventory.some(
        (apparel) =>
          apparel.apparelCode === apparelCode && apparel.size === size
      )
  );

  //  If any invalid items exist, return an error & do NOT update anything
  if (invalidItems.length > 0) {
    return res.status(400).json(
      errorResponse("Some items are invalid. No updates were made.", {
        invalidItems,
      })
    );
  }

  // If all items are valid, update stock & price
  updates.forEach(({ apparelCode, size, stock, price }) => {
    const item = inventory.find(
      (apparel) => apparel.apparelCode === apparelCode && apparel.size === size
    );

    if (item) {
      item.stock = stock;
      item.price = price;
    }
  });

  writeInventory(inventory);

  return res.status(200).json(
    successResponse("Bulk update successful", {
      updatedItems: updates,
    })
  );
};
