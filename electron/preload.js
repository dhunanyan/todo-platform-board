const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loadBoardData: () => ipcRenderer.invoke("board:load"),
  saveBoardData: (data) => ipcRenderer.invoke("board:save", data)
});
