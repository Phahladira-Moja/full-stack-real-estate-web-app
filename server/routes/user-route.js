import express from "express";
import {
  addToFavorite,
  bookVisit,
  cancelBookings,
  createUser,
  getAllBookings,
  getAllFavorites,
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/getAllBookings", getAllBookings);
router.post("/getAllFavorites", getAllFavorites);
router.post("/cancelBooking/:id", cancelBookings);
router.post("/addToFavorite/:id", addToFavorite);

export { router as userRoute };
