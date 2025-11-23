import { Router } from "express";
import carController from "../controllers/CarController";

const router = Router();

router.post("/", carController.create);
router.get("/", carController.getAll);
router.get("/:id", carController.getById);
router.put("/:id", carController.update);
router.delete("/:id", carController.delete);

export default router;
