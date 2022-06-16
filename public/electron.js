const { Menu, ipcMain, app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const Usuario = require('./db/usuario');
const Atividade = require('./db/atividade');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        frame: false,
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
    //mainWindow.webContents.openDevTools();


    Atividade.sync();
    Usuario.sync();

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

function doLogin(usuario, senha) {
    Usuario.validaLogin(usuario, senha).then(resultado => {
        console.log('resposta do login ',resultado);
        if(resultado && resultado['dataValues'])
            mainWindow.webContents.send("fromMain", resultado['dataValues'])
        else
            mainWindow.webContents.send("fromMain", false);
    });
}

function createUsuario(usuario, senha) {
    console.log('entrou create usuario');
    Usuario.createUsuario(usuario, senha).then((resultado) => {
        console.log('result ',resultado);
        if(resultado && resultado['dataValues'])
        mainWindow.webContents.send("fromMain", resultado['dataValues']);
        else
        mainWindow.webContents.send("fromMain", false);
    }).catch((e) => {
        console.log(e);
    });
}

function getAtividadesUsuario(usuario) {

        console.log('Atividades');

            Atividade.getAtividades().then((resultado) => {
                console.log(resultado);

            }).catch((e) => {
                console.log(e);
            });
            
            
            // then(resposta => {
            // console.log('tes ',resposta);
            // if (resposta['success'])
            //     mainWindow.webContents.send("fromMain", {success: true, result: resposta})
            // else
            //     mainWindow.webContents.send("fromMain", {success: false, result: resposta});


     //   console.log(Atividade.getAtividades());
    }

ipcMain.on("toMain", (event, args) => {
    console.log('ARGS', args);
    if (args.funcao === "quit") {
        app.quit();
    }

    if (args.funcao === "login") {
        doLogin(args.usuario, args.senha);
    }

    if (args.funcao === 'createUsuario') {
        console.log('create usuario');
        createUsuario(args.usuario, args.senha);
    }

    if (args.funcao === "Home") {
        //win.loadURL(`/pages/Home.js`)
    }

    // ATIVIDADE
    if (args.funcao === "getAtividades") {
        console.log('at');
        getAtividadesUsuario(args.usuario);
    }
});
