import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: {
          connect: {
            email: userEmail,
          },
        },
      },
    });

    return res.status(200).send({
      message: "Residency created successfully",
      residency: residency,
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A residency with address already there");
    }

    throw new Error(error.message);
  }
});

// get all the residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).send(residency);
  } catch (error) {
    throw new Error(error.message);
  }
});
