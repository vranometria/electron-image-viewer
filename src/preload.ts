import { contextBridge, ipcRenderer, webUtils } from 'electron';

contextBridge.exposeInMainWorld('api', {
    fullpath: (file: File) => {
        return webUtils.getPathForFile(file);
    },
    resolveFiles: async (filePathes: string[]) => {
        return await ipcRenderer.invoke('resolveFiles', filePathes);
    },
});
