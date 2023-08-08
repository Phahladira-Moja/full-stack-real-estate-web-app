import express from "express";
import { createUser } from "../controllers/user-controller.js";
import { createResidency } from "../controllers/residency-controller.js";

const router = express.Router();

router.post("/create", createResidency);

export { router as residencyRoute };
