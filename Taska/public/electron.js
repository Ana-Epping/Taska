const electron = require("electron");
const { Menu, ipcMain } = electron;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
// const Usuario = require('./db/usuario');
require('./express');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: true, // turn off remote
            preload: path.join(__dirname, "preload.js") // use a preload script
        }
    });
    mainWindow.loadURL(isDev ? "http://localhost:3000" :
        `file://${path.join(__dirname, "../build/index.html")}`);

    mainWindow.on("closed", () => (mainWindow = null));
    //Menu.setApplicationMenu(null);
    mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});


// function doLogin(usuario, senha) {
//     Usuario.validaLogin(usuario, senha).then(resposta => {
//         if (resposta)
//             mainWindow.webContents.send("fromMain", true)
//         else
//             mainWindow.webContents.send("fromMain", false);
//     });
// }

// ipcMain.on("toMain", (event, args) => {
//     console.log(args);
//     if (args.funcao === "login")
//         doLogin(args.usuario, args.senha);
// });