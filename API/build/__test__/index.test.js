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
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
const items_1 = require("../service/items");
const API = "https://api.mercadolibre.com";
jest.mock('axios');
const mockedAxios = axios_1.default;
axios_1.default.get = jest.fn();
// service/items.ts - getItems
describe('getItems', () => {
    beforeAll(() => {
        jest.clearAllMocks(); // Clear all the mocks
    });
    it('should return a list of items', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = 'mesa';
        const mockSearchResponse = {
            data: {
                results: [{
                        id: "MLA1119296451",
                        title: "Mesa",
                        currency_id: "ARS",
                        price: 1,
                        thumbnail: "http://http2.mlstatic.com/D_684980-MLA72798957766_112023-I.jpg",
                        condition: "new",
                        shipping: {
                            free_shipping: true
                        },
                        initial_quantity: 1,
                        category_id: "MLA6656"
                    }]
            }
        };
        const idCategory = 'MLA6656';
        const mockCategoryResponse = {
            data: {
                path_from_root: [
                    { id: "MLA1574", name: "Hogar, Muebles y Jardín" },
                    { id: "MLA436380", name: "Muebles para el Hogar" },
                    { id: "MLA436389", name: "Sillas, Sillones y Banquetas" },
                    { id: "MLA6656", name: "Bancos y Banquetas" }
                ]
            }
        };
        const mockResponse = {
            author: {
                name: 'Diego Ezequiel',
                lastname: 'Medina'
            },
            categories: mockCategoryResponse.data.path_from_root.map((item) => item.name),
            items: mockSearchResponse.data.results.map((item) => ({
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
        mockedAxios.get.mockResolvedValueOnce(mockSearchResponse); // https://api.mercadolibre.com/sites/MLA/search?q=mesa&limit=4
        mockedAxios.get.mockResolvedValueOnce(mockCategoryResponse); // https://api.mercadolibre.com/categories/MLA6656
        const result = yield (0, items_1.getItems)(query);
        expect(result).toEqual(mockResponse);
        expect(axios_1.default.get).toHaveBeenCalledWith(`${API}/sites/MLA/search?q=${query}&limit=4`);
        expect(axios_1.default.get).toHaveBeenCalledWith(`${API}/categories/${idCategory}`);
    }));
    it('should return an empty list if query is not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, items_1.getItems)();
        expect(result).toEqual([]);
    }));
});
// service/items.ts - getItem
describe('getItem', () => {
    beforeAll(() => {
        jest.clearAllMocks(); // Clear all the mocks
    });
    it('should return an item', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 'MLA1119296451';
        const mockItemResponse = {
            data: {
                id: "MLA1119296451",
                title: "Mesa",
                currency_id: "ARS",
                price: 1,
                thumbnail: "http://http2.mlstatic.com/D_684980-MLA72798957766_112023-I.jpg",
                condition: "new",
                shipping: {
                    free_shipping: true
                },
                initial_quantity: 1,
                category_id: "MLA6656"
            }
        };
        const mockDescriptionResponse = {
            data: {
                plain_text: "Description"
            }
        };
        const mockCategoryResponse = {
            data: {
                path_from_root: [
                    { id: "MLA1574", name: "Hogar, Muebles y Jardín" },
                    { id: "MLA436380", name: "Muebles para el Hogar" },
                    { id: "MLA436389", name: "Sillas, Sillones y Banquetas" },
                    { id: "MLA6656", name: "Bancos y Banquetas" }
                ]
            }
        };
        const mockResponse = {
            author: {
                name: 'Diego Ezequiel',
                lastname: 'Medina'
            },
            categories: mockCategoryResponse.data.path_from_root.map((item) => item.name),
            item: {
                id: mockItemResponse.data.id,
                title: mockItemResponse.data.title,
                price: {
                    currency: mockItemResponse.data.currency_id,
                    amount: Math.floor(mockItemResponse.data.price),
                    decimals: Number((mockItemResponse.data.price % 1).toFixed(2).split('.')[1])
                },
                picture: mockItemResponse.data.thumbnail,
                condition: mockItemResponse.data.condition,
                free_shipping: mockItemResponse.data.shipping.free_shipping,
                sold_quantity: mockItemResponse.data.initial_quantity,
                description: mockDescriptionResponse.data.plain_text,
                category: mockItemResponse.data.category_id
            }
        };
        mockedAxios.get.mockResolvedValueOnce(mockItemResponse); // https://api.mercadolibre.com/items/MLA1119296451
        mockedAxios.get.mockResolvedValueOnce(mockDescriptionResponse); // https://api.mercadolibre.com/items/MLA1119296451/description
        mockedAxios.get.mockResolvedValueOnce(mockCategoryResponse); // https://api.mercadolibre.com/categories/MLA6656
        const result = yield (0, items_1.getItem)(id);
        expect(result).toEqual(mockResponse);
        expect(axios_1.default.get).toHaveBeenCalledWith(`${API}/items/${id}`);
        expect(axios_1.default.get).toHaveBeenCalledWith(`${API}/items/${id}/description`);
        expect(axios_1.default.get).toHaveBeenCalledWith(`${API}/categories/${mockItemResponse.data.category_id}`);
    }));
    it('should return an empty item if id is not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, items_1.getItem)();
        expect(result).toEqual({});
    }));
});
// service/items.ts - GetCategory
describe('getCategory', () => {
    beforeAll(() => {
        jest.clearAllMocks(); // Clear all the mocks
    });
    it('should return a list of categories', () => __awaiter(void 0, void 0, void 0, function* () {
        const idCategory = 'MLA6656';
        const mockResponse = {
            data: {
                path_from_root: [
                    { id: "MLA1574", name: "Hogar, Muebles y Jardín" },
                    { id: "MLA436380", name: "Muebles para el Hogar" },
                    { id: "MLA436389", name: "Sillas, Sillones y Banquetas" },
                    { id: "MLA6656", name: "Bancos y Banquetas" }
                ]
            }
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);
        const result = yield (0, items_1.getCategory)(idCategory);
        expect(result).toEqual(['Hogar, Muebles y Jardín', 'Muebles para el Hogar', 'Sillas, Sillones y Banquetas', 'Bancos y Banquetas']);
        expect(axios_1.default.get).toHaveBeenCalledWith(`${API}/categories/${idCategory}`); // https://api.mercadolibre.com/categories/MLA6656
    }));
    it('should return an empty array if idCategory is not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield (0, items_1.getCategory)();
        expect(categories).toEqual([]);
    }));
});
// utils/utils.ts - GetTopCategory
describe('getTopCategory', () => {
    it('should return the top category', () => {
        const topCategory = (0, utils_1.getTopCategory)(['Hogar, Muebles y Jardín', 'Muebles para el Hogar', 'Hogar, Muebles y Jardín']);
        expect(topCategory).toEqual('Hogar, Muebles y Jardín');
    });
    it('should return the first category', () => {
        const topCategory = (0, utils_1.getTopCategory)(['Muebles para el Hogar']);
        expect(topCategory).toEqual('Muebles para el Hogar');
    });
    it('should return an empty string if empry array', () => {
        const topCategory = (0, utils_1.getTopCategory)([]);
        expect(topCategory).toEqual('');
    });
});
