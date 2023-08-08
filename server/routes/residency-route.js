import express from "express";
import { createUser } from "../controllers/user-controller.js";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residency-controller.js";

const router = express.Router();

router.get("/:id", getResidency);
router.post("/create", createResidency);
router.get("/getAllResidencies", getAllResidencies);

export { router as residencyRoute };
