"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Not authorized",
            });
            return;
        }
        const actualToken = token.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Invalid token",
        });
    }
};
exports.protect = protect;
