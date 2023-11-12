"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("./router/router"));
const coin_soap_service_1 = require("./soap/service/coin.soap.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const fileUpload = require("express-fileupload");
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(fileUpload());
dotenv_1.default.config();
app.use((req, res, next) => {
    console.log(`🤖 Nutricraft Logging 🤖  ${req.ip} : \x1b[1m${req.method}\x1b[0m ${req.originalUrl} || :${res.statusCode}:`);
    next();
});
(0, router_1.default)(app);
app.post('/', coin_soap_service_1.SubtractCoin);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
