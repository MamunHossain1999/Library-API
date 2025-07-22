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
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = void 0;
const google_service_1 = require("./google.service");
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { credential } = req.body;
    try {
        const { user, token } = yield (0, google_service_1.handleGoogleLogin)(credential);
        // Cookie set
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Google login failed:", error);
        res.status(401).json({ message: "Google login failed" });
    }
});
exports.googleLogin = googleLogin;
