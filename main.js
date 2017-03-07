// const electronLocalshortcut = require('electron-localshortcut');
const {app, BrowserWindow, clipboard, dialog} = require('electron');
const path = require('path');
const url = require('url');
// require('electron-reload')(__dirname);

// check if development mode or production
var isDev = false;
for(var i =0; i < process.argv.length; i++){
    if(process.argv[i] == 'dev'){
        isDev = true;
    }
}
if(isDev){
    console.log('Development Mode');
} else {
    console.log('Production Mode');
}

// put isDev in global
global.sharedObject = {isDev: isDev};


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 900,
        height: 600,
        titleBarStyle: 'hidden',
        backgroundColor: '#ffffff',
        icon: path.join(__dirname, 'assets/icons/png/512x512.png')
    });

    // Disable menu bar
    win.setMenu(null);

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
        app.quit()
    // }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
