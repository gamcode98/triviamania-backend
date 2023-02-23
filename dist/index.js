"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const config_1 = require("./config");
const db_1 = require("./config/db");
const index_1 = __importDefault(require("./routes/index"));
const error_handler_1 = require("./middlewares/error.handler");
const authProvider_handler_1 = require("./middlewares/authProvider.handler");
void (0, db_1.connection)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
passport_1.default.use((0, authProvider_handler_1.useGoogleStrategy)());
app.use((0, cors_1.default)());
(0, index_1.default)(app);
app.use(error_handler_1.logErrors);
app.use(error_handler_1.boomErrorHandler);
app.use(error_handler_1.errorHandler);
app.listen(config_1.config.port, () => console.log(`Listening: ${config_1.config.backendUrl}:${config_1.config.port} - 🚀`));
