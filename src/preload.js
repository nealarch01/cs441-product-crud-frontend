const { contextBridge, ipcRenderer } = require("electron");
const productsCrud = require("products-crud");


contextBridge.exposeInMainWorld("backendAPI", {
    getAllProducts: async () => ipcRenderer.invoke("getAllProducts"),
    getProductBySku: async (sku) => ipcRenderer.invoke("getProductBySku", sku),
    updateProductQuantity: async (sku, quantity) => ipcRenderer.invoke("updateProductQuantity", sku, quantity),
})