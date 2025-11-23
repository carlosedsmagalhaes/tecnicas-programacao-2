import { Router } from "express";
import stateRoutes from "./state";
import cityRoutes from "./city";
import districtRoutes from "./district";

const router = Router();

router.use("/states", stateRoutes);
router.use("/cities", cityRoutes);
router.use("/districts", districtRoutes);

export default router;
