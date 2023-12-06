import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

export async function openMainWindow(webpackEntry: string): Promise<BrowserWindow> {
  let windows = BrowserWindow.getAllWindows();
  if (windows.length === 0) {
    await createMainWindow(webpackEntry);
    windows = BrowserWindow.getAllWindows();
  } else {
    windows[0].show();
    windows[0].focus();
  }

  return windows[0];
}

async function createMainWindow(webpackEntry: string) {
  const config: BrowserWindowConstructorOptions = {
    width: 600,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      spellcheck: false
    }
  };
  
  const win = new BrowserWindow(config);
  
  const loadedPromise = new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Timed-out waiting for window to load")),
      10000
    );
    win.webContents.once("did-finish-load", () => {
      clearTimeout(timeout);
      resolve();
    });
  });

  win.loadURL(webpackEntry);
  await loadedPromise;
}