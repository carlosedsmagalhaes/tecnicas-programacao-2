import { Router } from "express";
import personRoutes from "./person";
import carRoutes from "./car";
import phoneRoutes from "./phone";
import carByPersonRoutes from "./carbyperson";

const router = Router();

router.use("/people", personRoutes);
router.use("/cars", carRoutes);
router.use("/phones", phoneRoutes);
router.use("/car-by-person", carByPersonRoutes);

export default router;
