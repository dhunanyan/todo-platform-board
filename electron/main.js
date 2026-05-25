const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("node:fs");

const isDev = !app.isPackaged;
const DATA_DIR = path.join(app.getPath("userData"), "public-assets");
const DATA_FILE = path.join(DATA_DIR, "tickets.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ tickets: [], labels: [] }, null, 2), "utf-8");
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "..", "out", "index.html"));
  }
}

app.whenReady().then(() => {
  ensureStore();

  ipcMain.handle("board:load", async () => {
    try {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    } catch {
      return { tickets: [], labels: [] };
    }
  });

  ipcMain.handle("board:save", async (_event, data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
