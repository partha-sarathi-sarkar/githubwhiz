import { Router } from "express";
import { getHome } from "../controllers/index.controller";

const router = Router();
router.get("/", getHome);

export default router;