const { Menu, ipcMain, app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const Usuario = require('./db/usuario');
const Atividade = require('./db/atividade');
const Rotulo = require('./db/rotulo');
const Situacao = require('./db/situacao');

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
    Rotulo.sync();
    Situacao.sync();
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
        console.log('resposta do login ', resultado);
        if (resultado && resultado['dataValues'])
            mainWindow.webContents.send("fromMain", resultado['dataValues'])
        else
            mainWindow.webContents.send("fromMain", false);
    });
}

function createUsuario(usuario, senha) {
    console.log('entrou create usuario');
    Usuario.createUsuario(usuario, senha).then((resultado) => {
        console.log('result ', resultado);
        if (resultado && resultado['dataValues'])
            mainWindow.webContents.send("fromMain", resultado['dataValues']);
        else
            mainWindow.webContents.send("fromMain", false);
    }).catch((e) => {
        console.log(e);
    });
}

function getAtividadesUsuario(usuario) {

    console.log('Atividades', usuario);

    Atividade.getAtividades(usuario).then((resultado) => {
        console.log(resultado);

    }).catch((e) => {
        console.log(e);
    });
}

function createAtividadeUsuario(usuario, titulo, descricao, data_inicio, id_situacao, id_rotulo) {
    console.log('Atividades');
let data = {'titulo': titulo, 'descricao': descricao, 'data_inicio': data_inicio, 'id_usuario': usuario, 'id_situacao': id_situacao, 'id_rotulo': id_rotulo};
    Atividade.createAtividade(data).then((resultado) => {
        console.log(resultado);

    }).catch((e) => {
        console.log(e);
    });
}

function getRotuloUsuario(usuario) {

    console.log('rotulos', usuario);

    Rotulo.getRotuloUsuario(usuario).then((resultado) => {
        console.log(resultado);

    }).catch((e) => {
        console.log(e);
    });
}

function createRotuloUsuario(usuario, descricao, icon, color) {
    console.log('rotulo', {'descricao': descricao, 'icon': icon, 'color':color, 'id_usuario': usuario});
let data = {'descricao': descricao, 'icon': icon, 'color':color, 'id_usuario': usuario};
    Rotulo.createRotulo(data).then((resultado) => {
        console.log(resultado);

    }).catch((e) => {
        console.log(e);
    });
}
function getSituacoes(){
    console.log('get situacao');
    Situacao.getSituacoes().then((resultado) => {
        console.log(resultado);

    }).catch((e) => {
        console.log(e);
    });
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

    if (args.funcao === 'createAtividade') {
        console.log('create at');
        createAtividadeUsuario(args.usuario, args.titulo, args.descricao, args.data_inicio, args.id_situacao, args.id_rotulo);
    }

    // ROTULO
    if (args.funcao === "getRotulos") {
        console.log('at');
        getRotuloUsuario(args.usuario);
    }

    if (args.funcao === 'createRotulo') {
        console.log('create at');
        createRotuloUsuario(args.usuario, args.descricao, args.icon, args.color);
    }

    // SITUACAO
    if (args.funcao === "getSituacoes") {
        console.log('at');
        getSituacoes();
    }
});
