import * as fs from "fs";

export function fileToBase64(filePath: string) {
  const binary: Buffer = fs.readFileSync(filePath);
  return binary.toString("base64");
}
