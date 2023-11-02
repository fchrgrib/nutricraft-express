"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_router_1 = __importDefault(require("./router/auth/auth.router"));
const middleware_1 = __importDefault(require("./handler/middleware/middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
app.use((req, res, next) => {
    console.log(`🤖 Nutricraft Logging 🤖  ${req.ip} : \x1b[1m${req.method}\x1b[0m ${req.originalUrl} || :${res.statusCode}:`);
    next();
});
(0, auth_router_1.default)(app);
app.use('/home', middleware_1.default);
app.get('/home', (req, res) => {
    res.status(200).send({ status: `welcome ${req.cookies['token']}` });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
