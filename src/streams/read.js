import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const fileToReadPath = join(__dirname, "files/fileToRead.txt");

  createReadStream(fileToReadPath, "utf8").pipe(process.stdout);
};

await read();
