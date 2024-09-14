import express from "express";
import { createRoomController, hostCreatedRoomController } from "../controllers/createRoom.controller.js";

const route = express.Router();

route.post("/create", createRoomController);
route.get("/built", hostCreatedRoomController);


export default route;