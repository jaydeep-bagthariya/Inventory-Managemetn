import express, { Request, Response } from "express";
import cors from "cors";
import vendorRoutes from "./routes/vendor-routes";
import orderRoutes from "./routes/order-routes";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

app.use("/api/vendor", vendorRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Expres!");
});

// Error Handling Middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
