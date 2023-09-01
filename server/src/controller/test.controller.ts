import express, { Request, Response } from "express";
import { Character } from "../models/test.model"; // Adjust the path accordingly

const router = express.Router();

export async function createCharacter(req: Request, res: Response) {
  try {
    const { name, color } = req.body;
    if (!name || !color) {
      return res
        .status(400)
        .json({ message: "Both name and color are required." });
    }

    const newCharacter = await Character.create({ name, color });
    return res.status(201).json(newCharacter);
  } catch (error) {
    console.error("Error creating character:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// export async function getCharacter(req: Request, res: Response) {
//   try {
//     const characters = await Character.find();
//     return res.status(200).json(characters);
//   } catch (error) {
//     console.error("Error fetching characters:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// }

export async function getCharacter(req: Request, res: Response) {
  try {
    console.log("Attempting to fetch characters...");
    const characters = await Character.find({});
    console.log("Characters fetched successfully.");
    return res.status(200).json(characters);
  } catch (error: any) {
    console.error("Error fetching characters:", error);

    // Check if the error is related to the MongoDB connection
    if (error.name === "MongoNetworkError") {
      return res.status(500).json({ message: "MongoDB connection error." });
    }

    return res.status(500).json({ message: "Internal server error." });
  }
}
