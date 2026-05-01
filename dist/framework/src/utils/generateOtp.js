"use strict";
// framework/src/utils/generateOtp.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = generateOTP;
const OTPAuth = __importStar(require("otpauth"));
/**
 * generateOTP
 *
 * Generates a 6-digit Time-Based One-Time Password (TOTP)
 * using a Base32 secret (compatible with Azure / Microsoft Authenticator).
 *
 * @param secretBase32 - The Base32 encoded OTP secret
 * @returns string - 6 digit OTP code
 */
function generateOTP(secretBase32) {
    // Normalise the secret (remove spaces + ensure uppercase)
    const normalisedSecret = String(secretBase32).replace(/\s+/g, '').toUpperCase();
    const secret = OTPAuth.Secret.fromBase32(normalisedSecret);
    const totp = new OTPAuth.TOTP({
        secret,
        digits: 6,
        algorithm: 'SHA1',
        period: 30, // 30 second rotation (standard Microsoft/Azure)
    });
    // OTPAuth returns a string
    return totp.generate();
}
//# sourceMappingURL=generateOtp.js.map