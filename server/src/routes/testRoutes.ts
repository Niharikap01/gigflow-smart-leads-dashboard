import express from "express";
import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/sales",
  protect,
  authorizeRoles("admin", "sales"),
  (req, res) => {
    res.json({
      message: "Welcome Sales User",
    });
  }
);

export default router;