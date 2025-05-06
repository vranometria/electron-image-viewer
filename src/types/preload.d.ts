import { FileData } from "./file-data";

export declare global {
  interface Window {
    api: {
        fullpath: (p: File) => string;
        resolveFiles: (filePathes: string[]) => Promise<FileData[]>;
        deleteFile: (filePath: string) => Promise<boolean>;
    };
  }
}