"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
router.get("/admin", authMiddleware_1.protect, (0, roleMiddleware_1.authorizeRoles)("admin"), (req, res) => {
    res.json({
        message: "Welcome Admin",
    });
});
router.get("/sales", authMiddleware_1.protect, (0, roleMiddleware_1.authorizeRoles)("admin", "sales"), (req, res) => {
    res.json({
        message: "Welcome Sales User",
    });
});
exports.default = router;
