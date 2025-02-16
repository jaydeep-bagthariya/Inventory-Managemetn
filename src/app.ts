import express, { Request, Response } from "express";
import cors from "cors";
import vendorRoutes from "./routes/vendor-routes";
import orderRoutes from "./routes/order-routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

app.use("/api/vendor", vendorRoutes);
app.use("/api/order", orderRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app; // Export the app for testing
