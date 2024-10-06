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
const cors_1 = __importDefault(require("cors"));
const items_1 = require("./service/items");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
app.get('/api/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    if (!query) {
        res.status(400).send('Missing query parameter');
        return;
    }
    if (typeof query !== 'string') {
        res.status(400).send('Invalid query parameter');
        return;
    }
    try {
        const response = yield (0, items_1.getItems)(query);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get('/api/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400).send('Missing id parameter');
        return;
    }
    try {
        const response = yield (0, items_1.getItem)(id);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
