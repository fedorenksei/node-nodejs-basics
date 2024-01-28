import { unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
  const fileToRemovePath = join(__dirname, "files/fileToRemove.txt");

  try {
    await unlink(fileToRemovePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw err;
  }
};

await remove();
