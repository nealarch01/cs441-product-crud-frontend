const { app, BrowserWindow, ipcMain } = require("electron");
const productsCrud = require("products-crud");
const config = require("./config.json");

class CrudServices {
    async getAllProducts(event, args) {
        const data = await productsCrud.getAllProducts();
        return data;
    }
    
    async getProductBySku(event, sku) {
        const data = await productsCrud.getProductBySku(sku);
        return data
    }

    async createProduct(event, title, brand, summary, category, price, quantity, supplier) {
        function generateSku() {
            // Format: 12-345-6789
            const randomNumber = () => Math.floor(Math.random() * 10); // Generates a number between 0 and 9 inclusive
            let sku = `${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}`;
            return sku;
        }
        const sku = generateSku();
        // const employeeId = config.employeeID
        const employeeID = 1;
        // Format for date is: 2022-01-01 00:00:00
        const date = new Date();
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        // sku?: string, title?: string, brand?: string, summary?: string, price?: number, quantity?: number, category?: string, creator?: number, creation_date?: string, supplier?: string
        let newProduct = new productsCrud.Product(sku, title, brand, summary, price, quantity, category, employeeID, dateString, supplier);
        const data = await productsCrud.createProduct(newProduct);

        return data;
    }

    async updateProductQuantity(event, sku, quantity) {
        const data = await productsCrud.updateQuantity(sku, quantity);
        return data;
    }

    async deleteProduct(event, sku) {
        const data = await productsCrud.deleteProduct(sku);
        return data;
    }
}

crudServices = new CrudServices();

// IPC Main Process Handlers
ipcMain.handle("getAllProducts", crudServices.getAllProducts);

ipcMain.handle("getProductBySku", crudServices.getProductBySku);

ipcMain.handle("updateProductQuantity", crudServices.updateProductQuantity);

ipcMain.handle("deleteProduct", crudServices.deleteProduct);

ipcMain.handle("createProduct", crudServices.createProduct);

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: config.window_width,
        height: config.window_height,
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + "/preload.js"
        },
    });
    mainWindow.loadFile(`${__dirname}/html/index.html`);
}

function start() {
    app.on("ready", () => {
        createMainWindow();
    });

    app.on("window-all-closed", () => {
        // On Windows and Linux, the default behavior is to close the app when all windows are closed.
        // On macOS, the default behavior is to keep the app running until the user explicitly quits.
        if (process.platform !== "darwin") { // Darwin == macOS
            app.quit(); // Implements the default behavior for Windows and Linux
        }
    });

    app.on("activate", () => {
        // On MacOS, the default behavior is to re-create a window in the app when the dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
}


start();