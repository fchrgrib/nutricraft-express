"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((req, res, next) => {
    console.log(`🤖 Nutricraft Logging 🤖  ${req.ip} : \x1b[1m${req.method}\x1b[0m ${req.originalUrl} || :${req.statusCode}:`);
    next();
});
app.get('/', (req, res) => {
    const header = { alg: "HS256", typ: "JWT" };
    const payload = { id: 1, email: "kontol@gmail.com" };
    const encodeHeader = Buffer.from(JSON.stringify(header)).toString("base64");
    const encodePayload = Buffer.from(JSON.stringify(payload)).toString("base64");
    const signature = crypto_1.default
        .createHmac("sha256", "kontol-kuda")
        .update(encodeHeader + "." + encodePayload)
        .digest("base64");
    res.send(`${encodeHeader} : ${encodePayload} : ${signature}`);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
