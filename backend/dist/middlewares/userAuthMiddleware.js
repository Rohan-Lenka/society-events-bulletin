"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function userAuthMiddleware(req, res, next) {
    const token = req.headers.authorization;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.USER_JWT_SECRET);
        if (decoded) {
            // @ts-ignore
            req.userId = decoded.id;
            next();
        }
    }
    catch (err) {
        res.status(401).json({
            message: "unauthorized user"
        });
    }
}
exports.default = userAuthMiddleware;
