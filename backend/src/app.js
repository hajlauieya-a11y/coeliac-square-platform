import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import workshopRoutes from "./routes/workshopRoutes.js";
import expertRoutes from "./routes/expertRoutes.js";

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
app.use("/api/events", eventRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/expert", expertRoutes);

export default app;
