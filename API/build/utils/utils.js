"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopCategory = void 0;
const getTopCategory = (categories) => {
    if (!categories.length)
        return '';
    if (categories.length === 1)
        return categories[0];
    let count = {};
    categories.forEach((category) => {
        if (count[category]) {
            count[category]++;
        }
        else {
            count[category] = 1;
        }
    });
    const top = Object.keys(count).sort((a, b) => count[b] - count[a]);
    return top[0];
};
exports.getTopCategory = getTopCategory;
