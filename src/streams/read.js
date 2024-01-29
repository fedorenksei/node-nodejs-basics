import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { stdout } from "node:process";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const fileToReadPath = join(__dirname, "files/fileToRead.txt");

  const readable = createReadStream(fileToReadPath, "utf8");
  readable.pipe(stdout);
  readable.on("end", () => {
    stdout.write("\n\n");
  });
};

await read();
