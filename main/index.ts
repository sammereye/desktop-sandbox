import { app, BrowserWindow } from 'electron';
import { openMainWindow } from './services/windows';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
// declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

app.on('ready', () => {
  openMainWindow(MAIN_WINDOW_WEBPACK_ENTRY);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// MAC
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    openMainWindow(MAIN_WINDOW_WEBPACK_ENTRY);
  }
});