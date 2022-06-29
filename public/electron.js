const { Menu, ipcMain, app, Tray, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const Usuario = require('./db/usuario');
const Atividade = require('./db/atividade');
const Rotulo = require('./db/rotulo');
const Situacao = require('./db/situacao');

let mainWindow;

function createWindow() {
    const appIcon = new Tray(__dirname+'/icon.png')

    mainWindow = new BrowserWindow({
        fullscreen: true,
        frame: false,
        icon: __dirname+'/icon.png',
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

function editarAtividade(atividade) {
console.log('EDITAR ATIVIDADE', atividade);
}

function getAtividadesUsuario(usuario) {

    Atividade.getAtividades(usuario).then((resultado) => {
        if (resultado && resultado.length > 0) {
            let retorno = resultado.map((r) => {
                let data = r['dataValues'];
                data['backgroundColor'] = '#f3f9ff';
                data['textColor'] = '#1890ff';
                data['title'] = data['titulo'];
                data['date'] = data['data_inicio'];
                data['end'] = data['data_fim'];
                data['id_atividade'] = data['id'];
                return data;
            });
            mainWindow.webContents.send("fromMain", retorno)
        } else {
            mainWindow.webContents.send("fromMain", false);
        }
    }).catch((e) => {
        console.log(e);
    });
}

async function getAtividadeUsuario(usuario, idAtividade) {

    Atividade.getAtividade(usuario, idAtividade).then((resultado) => {
        console.log('res   id at ', resultado);
        if (resultado && resultado['dataValues']) {
            let data = resultado['dataValues'];
            getRotuloIdUsuario(usuario, data['id_rotulo']).then((resultR) => {
                data['rotulo'] = resultR;
                getSituacao(data['id_situacao']).then((resultS) => {
                    data['situacao'] = resultS;
                    mainWindow.webContents.send("fromMainAtividadeDetalhes", data);
                });
            });

        } else {
            mainWindow.webContents.send("fromMainAtividadeDetalhes", false);
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

function deleteAtividadeUsuario(usuario, idAtividade){
        
    let data = { id_usuario: usuario, id: idAtividade };
    Atividade.deleteAtividade(data).then((resultado) => {
        mainWindow.webContents.send("fromMainDeleteAtividade", resultado)
    }).catch((e) => {
        console.log('erro delete ',e);
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
function getRotuloIdUsuario(usuario, idRotulo) {
    console.log(usuario);
    return new Promise(resolve => {
        Rotulo.getRotuloIdUsuario(usuario, idRotulo).then((resultado) => {
            console.log('rotulo id  ', resultado);
            if (resultado && resultado['dataValues']) {
                resolve(resultado['dataValues']);
            } else {
                resolve(false);
            }

        }).catch((e) => {
            console.log(e);
        });
    })
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

function getSituacao(idSituacao) {
    return new Promise(resolve => {
        Situacao.getSituacao(idSituacao).then((resultado) => {
            console.log('rotulo id  ', resultado);
            if (resultado && resultado['dataValues']) {
                resolve(resultado['dataValues']);
            } else {
                resolve(false);
            }
        }).catch((e) => {
            console.log(e);
        });
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

    // ATIVIDADE
    if (args.funcao === "getAtividades") {
        getAtividadesUsuario(args.usuario);
    }

    if (args.funcao === "getAtividade") {
        getAtividadeUsuario(args.usuario, args.idAtividade);
    }

    if (args.funcao === 'createAtividade') {
        createAtividadeUsuario(args.usuario, args.titulo, args.descricao, args.data_inicio, args.id_situacao, args.id_rotulo);
    }

    if(args.funcao === 'deleteAtividade'){
        deleteAtividadeUsuario(args.usuario, args.idAtividade);
    }

    if(args.funcao === 'editarAtividade'){
        editarAtividade(args.atividade);
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
