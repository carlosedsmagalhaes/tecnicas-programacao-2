import { Router } from "express";
import personController from "../controllers/PersonController";

const router = Router();

router.post("/", personController.create.bind(personController));
router.get("/", personController.getAll.bind(personController));
router.get("/:id", personController.getById.bind(personController));
router.put("/:id", personController.update.bind(personController));
router.delete("/:id", personController.delete.bind(personController));

export default router;
