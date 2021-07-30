"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var apiRouter_1 = __importDefault(require("./routes/api/apiRouter"));
var mongoose_1 = require("mongoose");
dotenv_1.config();
var app = express_1.default();
var port = process.env.PORT || 8080;
//uses
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('Heloo from root! Fix typo for me!');
});
app.use('/api', apiRouter_1.default);
mongoose_1.connect(process.env.DB_URI + '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(function () {
    app.listen(port, function () {
        console.log("Server listening on http://localhost:" + port + " and MongoDB running");
    });
});
