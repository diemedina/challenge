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
exports.getCategory = exports.getItem = exports.getItems = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
const API = "https://api.mercadolibre.com";
const getItems = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (!query)
        return [];
    const response = yield axios_1.default.get(`${API}/sites/MLA/search?q=${query}&limit=4`);
    const data = response.data;
    const formattedModel = {
        author: {
            name: 'Diego Ezequiel',
            lastname: 'Medina'
        },
        categories: [],
        items: data.results.map((item) => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: Number((item.price % 1).toFixed(2).split('.')[1])
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            category: item.category_id
        }))
    };
    const topCategory = (0, utils_1.getTopCategory)(formattedModel.items.map((item) => item.category));
    formattedModel.categories = yield getCategory(topCategory);
    return formattedModel;
});
exports.getItems = getItems;
const getItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        return {};
    const [getItem, getDescription] = yield Promise.all([
        axios_1.default.get(`${API}/items/${id}`),
        axios_1.default.get(`${API}/items/${id}/description`)
    ]);
    const item = getItem.data;
    const description = getDescription.data;
    const formattedModel = {
        author: {
            name: 'Diego Ezequiel',
            lastname: 'Medina'
        },
        categories: [],
        item: {
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: Number((item.price % 1).toFixed(2).split('.')[1])
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            sold_quantity: item.initial_quantity,
            description: description.plain_text,
            category: item.category_id
        }
    };
    formattedModel.categories = yield getCategory(formattedModel.item.category);
    return formattedModel;
});
exports.getItem = getItem;
const getCategory = (idCategory) => __awaiter(void 0, void 0, void 0, function* () {
    if (!idCategory)
        return [];
    const response = yield axios_1.default.get(`${API}/categories/${idCategory}`);
    const data = response.data;
    return data.path_from_root.map((item) => item.name);
});
exports.getCategory = getCategory;
