import express from "express";

import { homePageController } from "../controllers/homePage.controller.js";

const router = express.Router();

router.get('/', homePageController);

export default router;