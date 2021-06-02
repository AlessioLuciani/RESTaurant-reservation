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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var uuid_1 = require("uuid");
var models_1 = require("./models");
var app = express_1.default();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Connect to MongoDB
mongoose_1.default
    .connect('mongodb://restaurant_auth_mongo:27017', { useNewUrlParser: true })
    .then(function () {
    console.log('MongoDB Connected');
    populateDbWithTestData();
})
    .catch(function (err) { return console.log(err); });
// Status check
app.get('/', function (req, res) {
    res.send('Running!');
});
// Registration POST interface
app.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, email, password, query, tokens, restaurant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, models_1.Restaurant.find({ "email": email }).exec()];
            case 1:
                query = _a.sent();
                if (query.length > 0) {
                    res.send({ "error": "A restaurant with this email address already exists." });
                    return [2 /*return*/];
                }
                tokens = [uuid_1.v4()];
                restaurant = new models_1.Restaurant({
                    name: name,
                    email: email,
                    password: password,
                    tokens: tokens
                });
                // Saving restaurant data
                return [4 /*yield*/, restaurant.save()];
            case 2:
                // Saving restaurant data
                _a.sent();
                res.send({ "token": tokens[0] });
                return [2 /*return*/];
        }
    });
}); });
// Login POST interface
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, token, query, restaurant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                token = req.body.token;
                return [4 /*yield*/, models_1.Restaurant.find({ "email": email }).exec()];
            case 1:
                query = _a.sent();
                // Checking if the restaurant is registered
                if (query.length == 0) {
                    res.send({ "error": "There is no restaurant registered with this email address." });
                    return [2 /*return*/];
                }
                restaurant = query[0];
                // Checking token
                if (token != null && restaurant.tokens.includes(token)) {
                    res.send({ "token": token });
                    return [2 /*return*/];
                }
                // Checking password
                if (password != restaurant.password) {
                    res.send({ "error": "The email address or the password are incorrect." });
                    return [2 /*return*/];
                }
                // Generating new session token
                token = uuid_1.v4();
                restaurant.tokens.push(token);
                // Updating restaurant data
                return [4 /*yield*/, restaurant.save()];
            case 2:
                // Updating restaurant data
                _a.sent();
                res.send({ "token": token });
                return [2 /*return*/];
        }
    });
}); });
// Logout POST interface
app.post('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, token, query, restaurant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                token = req.body.token;
                return [4 /*yield*/, models_1.Restaurant.find({ "email": email }).exec()];
            case 1:
                query = _a.sent();
                // Checking if the restaurant is registered
                if (query.length == 0) {
                    res.send({ "error": "There is no restaurant registered with this email address." });
                    return [2 /*return*/];
                }
                restaurant = query[0];
                // Deleting token
                restaurant.tokens.forEach(function (current, index) {
                    if (token === current) {
                        restaurant.tokens.splice(index, 1);
                    }
                });
                // Updating restaurant data
                return [4 /*yield*/, restaurant.save()];
            case 2:
                // Updating restaurant data
                _a.sent();
                res.send({});
                return [2 /*return*/];
        }
    });
}); });
// Validation GET interface
app.post('/validate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, token, query, restaurant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                token = req.body.token;
                return [4 /*yield*/, models_1.Restaurant.find({ "email": email }).exec()];
            case 1:
                query = _a.sent();
                // Checking if the restaurant is registered
                if (query.length == 0) {
                    res.send({ "error": "There is no restaurant registered with this email address." });
                    return [2 /*return*/];
                }
                restaurant = query[0];
                // Checking token
                if (token != null && restaurant.tokens.includes(token)) {
                    res.send({ "token": token });
                }
                else {
                    res.send({ "error": "Invalid token." });
                }
                return [2 /*return*/];
        }
    });
}); });
// TODO: remove this (only for debug)
app.get('/restaurants', function (req, res) {
    models_1.Restaurant.find().exec().then(function (restaurants) { res.send(restaurants); });
});
app.listen(3000, function () { return console.log('Server running...'); });
// Populating DB
function populateDbWithTestData() {
    return __awaiter(this, void 0, void 0, function () {
        var test_data, _i, test_data_1, rest, query, restaurant;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test_data = [
                        {
                            name: "ristorante buono",
                            email: "rbuono@mail.it",
                            password: "admin"
                        },
                        {
                            name: "pizzeria margherita",
                            email: "pizzeria@mail.it",
                            password: "admin"
                        },
                        {
                            name: "ristorante etnico",
                            email: "retnico@mail.it",
                            password: "admin"
                        },
                        {
                            name: "ristorante cattivo",
                            email: "rcattivo@mail.it",
                            password: "admin"
                        }
                    ];
                    _i = 0, test_data_1 = test_data;
                    _a.label = 1;
                case 1:
                    if (!(_i < test_data_1.length)) return [3 /*break*/, 5];
                    rest = test_data_1[_i];
                    return [4 /*yield*/, models_1.Restaurant.find({ "email": rest.email }).exec()];
                case 2:
                    query = _a.sent();
                    if (query.length > 0) {
                        return [3 /*break*/, 4];
                    }
                    restaurant = new models_1.Restaurant({
                        name: rest.name,
                        email: rest.email,
                        password: rest.password,
                        tokens: []
                    });
                    // Saving restaurant data
                    return [4 /*yield*/, restaurant.save()];
                case 3:
                    // Saving restaurant data
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
