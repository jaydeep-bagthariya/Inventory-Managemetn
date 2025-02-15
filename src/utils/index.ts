import fs from "fs";
import path from "path";
import { Apparel } from "../model";

const filePath = path.join(__dirname, "../data/inventory.json");

// Function to read inventory from JSON file
export const readInventory = (): Apparel[] => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf8"); // Create file if missing
    }

    const data = fs.readFileSync(filePath, "utf8");

    if (!data.trim()) {
      fs.writeFileSync(filePath, "[]", "utf8"); // Reset file if empty
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to write inventory to JSON file
export const writeInventory = (inventory: Apparel[]) => {
  fs.writeFileSync(filePath, JSON.stringify(inventory, null, 2), "utf8");
};
