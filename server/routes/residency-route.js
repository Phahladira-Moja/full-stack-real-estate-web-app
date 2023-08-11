import express from "express";
import { createUser } from "../controllers/user-controller.js";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residency-controller.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.get("/getAllResidencies", getAllResidencies);
router.get("/:id", getResidency);
router.post("/create", jwtCheck, createResidency);

export { router as residencyRoute };
