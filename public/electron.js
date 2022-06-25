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

    Situacao.sync();
    Atividade.sync();
    Usuario.sync();
    Rotulo.sync();
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
        if (resultado && resultado['dataValues'])
            mainWindow.webContents.send("fromMain", resultado['dataValues'])
        else
            mainWindow.webContents.send("fromMain", false);
    });
}

function createUsuario(usuario, senha) {
    Usuario.createUsuario(usuario, senha).then((resultado) => {
        if (resultado && resultado['dataValues'])
            mainWindow.webContents.send("fromMain", resultado['dataValues']);
        else
            mainWindow.webContents.send("fromMain", false);
    }).catch((e) => {
        console.log(e);
    });
}

function getAtividadesUsuario(usuario) {

    Atividade.getAtividades(usuario).then((resultado) => {
        if (resultado && resultado.length > 0) {
            let retorno = resultado.map((r) => {
                let data = r['dataValues'];
                return { id: data['id'], title: data['titulo'], date: data['data_inicio'], end: data['data_fim'] }
            });
            mainWindow.webContents.send("fromMain", retorno)
        } else {
            mainWindow.webContents.send("fromMain", false);
        }
    }).catch((e) => {
        console.log(e);
    });
}

function createAtividadeUsuario(usuario, titulo, descricao, data_inicio, id_situacao, id_rotulo) {
    let data = { 'titulo': titulo, 'descricao': descricao, 'data_inicio': data_inicio, 'id_usuario': usuario, 'id_situacao': id_situacao, 'id_rotulo': id_rotulo };
    Atividade.createAtividade(data).then((resultado) => {

    }).catch((e) => {
        console.log(e);
    });
}

function getRotuloUsuario(usuario) {
    console.log(usuario);
    Rotulo.getRotuloUsuario(usuario).then((resultado) => {
        if (resultado && resultado.length > 0) {
            let retorno = resultado.map((r) => {
                return r['dataValues'];
            });
            mainWindow.webContents.send("fromMainRotulo", retorno)
        } else {
            mainWindow.webContents.send("fromMainRotulo", false);
        }
    }).catch((e) => {
        console.log(e);
    });
}

function createRotuloUsuario(usuario, descricao, icon, color) {
    let data = { 'descricao': descricao, 'icon': icon, 'color': color, 'id_usuario': usuario };
    Rotulo.createRotulo(data).then((resultado) => {

    }).catch((e) => {
        console.log(e);
    });
}

function getSituacoes() {
    Situacao.getSituacoes().then((resultado) => {
        if (resultado && resultado.length > 0) {
            let retorno = resultado.map((r) => {
                return r['dataValues'];
            });
            console.log('ENtrou retorno situafcao', retorno);
            mainWindow.webContents.send("fromMainSituacao", retorno)
        } else {
            mainWindow.webContents.send("fromMainSituacao", false);
        }

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
        createUsuario(args.usuario, args.senha);
    }

    if (args.funcao === "Home") {
        //win.loadURL(`/pages/Home.js`)
    }

    // ATIVIDADE
    if (args.funcao === "getAtividades") {
        getAtividadesUsuario(args.usuario);
    }

    if (args.funcao === 'createAtividade') {
        createAtividadeUsuario(args.usuario, args.titulo, args.descricao, args.data_inicio, args.id_situacao, args.id_rotulo);
    }

    // ROTULO
    if (args.funcao === "getRotulos") {
        getRotuloUsuario(args.usuario);
    }

    if (args.funcao === 'createRotulo') {
        createRotuloUsuario(args.usuario, args.descricao, args.icon, args.color);
    }

    // SITUACAO
    if (args.funcao === "getSituacoes") {
        getSituacoes();
    }
});
