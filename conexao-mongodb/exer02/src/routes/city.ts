import { Router } from "express";
import cityController from "../controllers/CityController";

const router = Router();

router.post("/", cityController.create);
router.get("/", cityController.getAll);
router.get("/:id", cityController.getById);
router.put("/:id", cityController.update);
router.delete("/:id", cityController.delete);

export default router;
