import { Router } from "express";
import { getDay1 } from "../controllers/day1.controller";

const router = Router();
router.get("/linux-essentials", getDay1);

export default router;