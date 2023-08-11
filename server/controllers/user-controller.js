import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  let { email } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });

    return res.status(200).send({
      message: "User registered successfully",
      user: user,
    });
  }

  return res.status(201).send({
    message: "User already registered",
  });
});

// function to book a visit to a residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      return res.status(400).json({
        message: "The residency is already booked by you",
      });
    }

    await prisma.user.update({
      where: { email: email },
      data: {
        bookedVisits: { push: { id, date } },
      },
    });

    return res.status(200).send("Your visit is booked successfully");
  } catch (error) {
    throw new Error(error.message);
  }
});

// function to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: {
        email,
      },
      select: { bookedVisits: true },
    });

    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

// function to cancel the bookings
export const cancelBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }

    user.bookedVisits.splice(index, 1);
    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: user.bookedVisits,
      },
    });

    return res.status(200).send("Booking cancelled successfully");
  } catch (error) {
    throw new Error(error.message);
  }
});

// function to add a residency in favorite list of a user
export const addToFavorite = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user.favResidenciesID.includes(id)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== id),
          },
        },
      });

      return res.send({ message: "Removed from favorite", user: updateUser });
    }

    const updateUser = await prisma.user.update({
      where: { email },
      data: {
        favResidenciesID: {
          push: id,
        },
      },
    });

    return res.send({ message: "Updated favorite", user: updateUser });
  } catch (error) {
    throw new Error(error.message);
  }
});

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: {
        favResidenciesID: true,
      },
    });

    return res.status(200).send(favResd);
  } catch (error) {
    throw new Error(error.message);
  }
});
