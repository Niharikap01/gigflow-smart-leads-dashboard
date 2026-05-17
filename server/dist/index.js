"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
dotenv_1.default.config();
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/test", testRoutes_1.default);
app.use("/api/leads", leadRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API Running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
