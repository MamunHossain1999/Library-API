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
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../user/user.model");
const jwt_1 = require("../../../utils/jwt");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, 10);
    const user = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
    return { user };
});
exports.registerUser = registerUser;
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user)
        throw new Error('User not found');
    const match = yield bcryptjs_1.default.compare(payload.password, user.password);
    if (!match)
        throw new Error('Wrong password');
    const token = (0, jwt_1.signToken)({ id: user._id, email: user.email });
    return { user, token };
});
exports.loginUser = loginUser;
