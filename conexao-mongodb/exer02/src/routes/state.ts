import { Router } from "express";
import stateController from "../controllers/StateController";

const router = Router();

router.post("/", stateController.create);
router.get("/", stateController.getAll);
router.get("/:id", stateController.getById);
router.put("/:id", stateController.update);
router.delete("/:id", stateController.delete);

export default router;
