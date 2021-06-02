"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        type: Array,
        required: true
    }
});
exports.Restaurant = mongoose_1.default.model('Restaurant', RestaurantSchema);
