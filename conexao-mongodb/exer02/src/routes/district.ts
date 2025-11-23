import { Router } from "express";
import districtController from "../controllers/DistrictController";

const router = Router();

router.post("/", districtController.create);
router.get("/", districtController.getAll);
router.get("/:id", districtController.getById);
router.put("/:id", districtController.update);
router.delete("/:id", districtController.delete);

export default router;
