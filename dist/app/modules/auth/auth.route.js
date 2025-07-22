"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_controller_1 = require("./auth.controller");
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const google_controller_1 = require("./google.controller");
const authenticate_1 = require("../../../middlewares/authenticate");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(auth_validation_1.registerValidation), auth_controller_1.register);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.loginValidation), auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
router.get("/me", authenticate_1.authenticate, auth_controller_1.getMe);
router.post("/google-login", google_controller_1.googleLogin);
exports.AuthRoutes = router;
