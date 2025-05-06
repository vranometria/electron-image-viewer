import fs from "fs";
import path from "path";

export enum FileType {
  File,
  Directory,
  Other,
  Unknown,
}

export class Fs {
  static detectFileType(filePath: string) {
    try {
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        return FileType.File;
      } else if (stats.isDirectory()) {
        return FileType.Directory;
      } else {
        return FileType.Other;
      }
    } catch (error) {
      console.error(`Error detecting file type for ${filePath}:`, error);
      return FileType.Unknown;
    }
  }

  static isImageFile(filePath: string) {
    return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(filePath);
  }

  static resove(filePath: string) {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).slice(1);
    const base64 = data.toString('base64');
    return `data:image/${ext};base64,${base64}`;
  }

  static getFiles(dirPath: string, fileList: string[] = []) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        this.getFiles(fullPath, fileList);
      } else if (entry.isFile() && this.isImageFile(fullPath)) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }
}
