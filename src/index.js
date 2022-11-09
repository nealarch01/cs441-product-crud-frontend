const { app, BrowserWindow, ipc } = require("electron");
const config = require("./config.json");

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