import express from "express";

import * as ownersController from "../controllers/ownersController.js";

export const ownerRoutes = express.Router();

ownerRoutes.get("/", ownersController.getOwners);

ownerRoutes.get("/:id", ownersController.getOwnerById);

ownerRoutes.post("/", ownersController.createOwner);

ownerRoutes.patch("/:id", ownersController.updateOwnerById);

ownerRoutes.delete("/:id", ownersController.deleteOwnerById);