import express from "express";
import { createRoomController } from "../controllers/createRoom.controller.js";

const route = express.Router();

route.post("/create", createRoomController);

export default route;