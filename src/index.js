const { app, BrowserWindow, ipcMain } = require("electron");
const productsCrud = require("products-crud");
const config = require("./config.json");

// IPC Main Process Handlers
ipcMain.handle("getAllProducts", async (event, args) => {
    const data = await productsCrud.getAllProducts();
    return data;
});

ipcMain.handle("getProductBySku", async (event, args) => {
    const data = await productsCrud.getProductBySku(args);
    return data;
});


ipcMain.handle("updateProductQuantity", async (event, sku, quantity) => {
    const data = await productsCrud.updateQuantity(sku, quantity);
    return data;
});

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