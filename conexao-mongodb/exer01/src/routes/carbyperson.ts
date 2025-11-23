import { Router } from "express";
import carByPersonController from "../controllers/CarByPersonController";

const router = Router();

router.post("/", carByPersonController.create);
router.get("/", carByPersonController.getAll);
router.get("/:id", carByPersonController.getById);
router.put("/:id", carByPersonController.update);
router.delete("/:id", carByPersonController.delete);

export default router;
