"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("./router/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
app.use(express_1.default.json());
app.use(bodyParser());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true, origin: ['http://localhost:3000', 'http://nutricraft-spa', 'http://192.168.0.12:3000', 'http://172.18.0.1:3000'], methods: ['GET', 'POST', 'PUT', 'DELETE'], }));
app.use(express_1.default.static('image'));
dotenv_1.default.config();
(0, router_1.default)(app);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
