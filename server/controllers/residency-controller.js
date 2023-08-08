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

    res.status(200).send({
      message: "Residency created successfully",
      residency: residency,
    });
  } catch (error) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }

    throw new Error(err.message);
  }
});
