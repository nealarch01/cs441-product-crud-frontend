const { contextBridge } = require("electron");
const productsCrud = require("products-crud");


contextBridge.exposeInMainWorld("backend", {
    getAllProducts: async () => productsCrud.getAllProducts(),
    getProductBySku: async (sku) => productsCrud.getProductBySku(sku),
});