import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await User.deleteMany({});
    console.log("All users deleted");

    const newUser = await User.create({
      name: "Abass Ajibola",
      email: "abass@test.com",
      password: "password123!"
    });

    console.log("New user created:", newUser);
    process.exit();
  })
  .catch((err) => console.error(err));
