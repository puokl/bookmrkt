import mongoose, { Document, Schema } from "mongoose";

export interface ICharacter extends Document {
  name: string;
  color: string;
}

const characterSchema = new Schema({
  name: String,
  color: String,
});

export const Character = mongoose.model<ICharacter>(
  "Character",
  characterSchema
);
