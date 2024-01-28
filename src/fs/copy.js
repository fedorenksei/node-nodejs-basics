import { access, copyFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
  const oldFolderPath = join(__dirname, "files");
  const newFolderPath = join(__dirname, "files_copy");

  let doesNewPathExist;
  try {
    await access(newFolderPath);
    doesNewPathExist = true;
  } catch {
    // destination folder shouldn't exist, thus access() has to throw an error
  }
  if (doesNewPathExist) {
    throw new Error("FS operation failed");
  }

  let fileList;
  try {
    fileList = await readdir(oldFolderPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw err;
  }

  await mkdir(newFolderPath);

  fileList.forEach(async (fileName) => {
    const srcFilePath = join(oldFolderPath, fileName);
    const destFilePath = join(newFolderPath, fileName);
    try {
      await copyFile(srcFilePath, destFilePath);
    } catch (err) {
      throw err;
    }
  });
};

await copy();
