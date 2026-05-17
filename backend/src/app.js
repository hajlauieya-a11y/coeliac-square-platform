import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Coeliac Square API is working 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/recipes", recipeRoutes);

export default app;
