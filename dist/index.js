"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = __importDefault(require("./handler/middleware/middleware"));
const redis_conf_1 = require("./handler/conf/redis.conf");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router_1 = __importDefault(require("./router/router"));
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
(0, router_1.default)(app);
app.use('/home', middleware_1.default);
app.get('/home', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['token'];
    if (token === '')
        return res.status(401).send({ status: 'token doesnt exist' });
    const decode = jsonwebtoken_1.default.verify(token, `${process.env.JWT_KEY}${process.env.REFRESH_KEY}` || '');
    if (!(typeof decode === 'object' && 'uuid' in decode && typeof decode.uuid === 'string'))
        return res.status(401).send({ status: 'token is invalid' });
    const redis = (0, redis_conf_1.RedisConf)();
    yield redis.connect();
    try {
        const decodeRefresh = yield redis.get(`refresh-token-${decode.uuid}`);
        res.status(200).send({ status: `welcome access token: ${token}\nrefresh token:${decodeRefresh}` });
    }
    catch (e) {
        return res.status(401).send({ status: 'refreshToken is invalid' });
    }
    finally {
        redis.disconnect();
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
