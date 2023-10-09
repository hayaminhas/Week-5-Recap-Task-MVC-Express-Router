import express from "express";

import * as catsController from "../controllers/catsController.js";

export const ownerRoutes = express.Router();

catsRoutes.get("/", catsController.getCats);

catsRoutes.get("/:id", catsController.getCatsById);

catsRoutes.post("/", catsController.createCat);

catsRoutes.patch("/:id", catsController.updateCatById);

catsRoutes.delete("/:id", catsController.deleteCatById);