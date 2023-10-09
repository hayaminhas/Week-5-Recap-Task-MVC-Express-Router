//CRUD FUNCTIONALITY
// Import the required modules
import express from "express";
import morgan from "morgan";

import { ownersRoutes } from "./routes/ownersRoutes.js";
import { catsRoutes } from "./routes/catsRoutes.js";

// Initialize the express app
export const app = express();


// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

app.use("/owners", ownersRoutes);
app.use("/cats", catsRoutes);



