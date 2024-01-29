import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const fileToReadPath = join(__dirname, "files/fileToRead.txt");

  try {
    console.log(await readFile(fileToReadPath, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw err;
  }
};

await read();
