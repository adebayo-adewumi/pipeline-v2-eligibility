"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = require("express-rate-limit");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const limiter = (0, express_rate_limit_1.rateLimit)({
    max: 3,
    windowMs: 1000,
    message: "Too many request from this IP"
});
app.use(limiter);
app.get("/howold", (req, res) => {
    let queryParams = req.query;
    let regexWithSlash = /^([0-2]\d|(3)[0-1])(\/)(((0)\d)|((1)[0-2]))(\/)\d{4}$/g;
    let regexWithHyphen = /^([0-2]\d|(3)[0-1])(-)(((0)\d)|((1)[0-2]))(-)\d{4}$/g;
    if (!queryParams.hasOwnProperty("dob")) {
        res.status(400).json({
            status: "Bad Request",
            message: "dob parameter is required",
        });
    }
    if (!regexWithSlash.test(queryParams.dob) && !regexWithHyphen.test(queryParams.dob)) {
        res.status(400).json({
            status: "Bad Request",
            message: "Error: Date of Birth must be in any of this formats [dd/mm/yyyy, dd-mm-yyyy]",
        });
    }
    let dateOfBirth = new Date(queryParams.dob);
    let age = new Date().getFullYear() - dateOfBirth.getFullYear();
    res.status(200).json({
        status: "success",
        message: `Hey! buddie, you are ${age} years old.`,
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
