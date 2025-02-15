import { z } from "zod";

export const updateStockPriceSchema = z.object({
  apparelCode: z.string().min(1, "Apparel code is required"),
  size: z.string().min(1, "Size is required"),
  stock: z.number().int().min(0, "Stock must be a positive integer"),
  price: z.number().min(0, "Price must be a positive number"),
});

export const bulkUpdateStockPriceSchema = z.object({
  updates: z
    .array(
      z.object({
        apparelCode: z.string().min(1, "Apparel code is required"),
        size: z.string().min(1, "Size is required"),
        stock: z.number().int().min(0, "Stock must be a positive integer"),
        price: z.number().min(0, "Price must be a positive number"),
      })
    )
    .min(1, "At least one update is required"),
});

export const checkOrderAvailabilitySchema = z.object({
  order: z
    .array(
      z.object({
        apparelCode: z.string().min(1, "Apparel code is required"),
        size: z.string().min(1, "Size is required"),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be a positive integer"),
      })
    )
    .nonempty("At least one item is required"),
});

export const getLowestOrderCostSchema = z.object({
  order: z
    .array(
      z.object({
        apparelCode: z.string().min(1, "Apparel code is required"),
        size: z.string().min(1, "Size is required"),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be a positive integer"),
      })
    )
    .nonempty("At least one item is required"),
});
