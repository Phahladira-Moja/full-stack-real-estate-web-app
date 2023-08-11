import express from "express";
import {
  addToFavorite,
  bookVisit,
  cancelBookings,
  createUser,
  getAllBookings,
  getAllFavorites,
} from "../controllers/user-controller.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/getAllBookings", jwtCheck, getAllBookings);
router.post("/getAllFavorites", jwtCheck, getAllFavorites);
router.post("/cancelBooking/:id", jwtCheck, cancelBookings);
router.post("/addToFavorite/:id", jwtCheck, addToFavorite);

export { router as userRoute };
