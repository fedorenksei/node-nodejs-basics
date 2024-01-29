import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { stdin } from "node:process";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const write = async () => {
  const fileToWritePath = join(__dirname, "files/fileToWrite.txt");

  stdin.pipe(createWriteStream(fileToWritePath));
};

await write();
