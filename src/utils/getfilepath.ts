import * as fs from "fs";
import * as path from "path";

const mainPath = process.env.MAIN_PATH || path.resolve(`reports`);

export function getFilePath(filename: string): string {
  let folderReady = false;
  do {
    folderReady = fs.existsSync(mainPath);
  } while (!folderReady);
  return path.join(mainPath, filename);
}

export function validatePath() {
  if (!fs.existsSync(mainPath)) {
    console.log(`Folder does not exits... creating... in ${mainPath}`);
    fs.mkdirSync(mainPath, { recursive: true });
  }
}
