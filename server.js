import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

import indexRoute from "./routes/index.route.js";
import roomRoute from "./routes/createRoom.route.js";
import cookieRoute from "./routes/cookie.route.js";

import {hostCreatedRoomController} from './controllers/createRoom.controller.js';

const port = 3000;
const app = express();

const dbUrl = "mongodb://localhost:27017/mainDB";

// middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// routes
app.use("/", indexRoute);
app.use("/room", roomRoute);
app.use("/cookie", cookieRoute);

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
});