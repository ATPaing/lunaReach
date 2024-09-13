import express from "express";
import {checkCookieController} from "../controllers/cookie.controller.js";

const route = express.Router();

route.get("/check", checkCookieController);

export default route;