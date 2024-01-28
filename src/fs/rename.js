import { access, rename as fsRename } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const rename = async () => {
  const oldNamePath = join(__dirname, "files/wrongFilename.txt");
  const newNamePath = join(__dirname, "files/properFilename.md");

  let doesNewPathExist;
  try {
    await access(newNamePath);
    doesNewPathExist = true;
  } catch {
    // file on the new path shouldn't exist, thus access() has to throw an error
  }
  if (doesNewPathExist) {
    throw new Error("FS operation failed");
  }

  try {
    await fsRename(oldNamePath, newNamePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw err;
  }
};

await rename();
