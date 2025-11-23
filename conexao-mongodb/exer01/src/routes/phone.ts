import { Router } from "express";
import phoneController from "../controllers/PhoneController";

const router = Router();

router.post("/", phoneController.create);
router.get("/", phoneController.getAll);
router.get("/:id", phoneController.getById);
router.put("/:id", phoneController.update);
router.delete("/:id", phoneController.delete);

export default router;
