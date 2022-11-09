const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("backendAPI", {
    getAllProducts: async () => ipcRenderer.invoke("getAllProducts"),
    getProductBySku: async (sku) => ipcRenderer.invoke("getProductBySku", sku),
    updateProductQuantity: async (sku, quantity) => ipcRenderer.invoke("updateProductQuantity", sku, quantity),
    deleteProduct: async (sku) => ipcRenderer.invoke("deleteProduct", sku),
    createProduct: async (title, brand, summary, category, price, quantity, supplier) => ipcRenderer.invoke("createProduct", title, brand, summary, category, price, quantity, supplier)
});