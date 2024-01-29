import { createReadStream, createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { createGunzip } from "node:zlib";
const __dirname = dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
  const readable = createReadStream(join(__dirname, "files/archive.gz"));
  const gunzip = createGunzip();
  const writable = createWriteStream(
    join(__dirname, "files/fileToCompress.txt")
  );
  pipeline(readable, gunzip, writable);
};

await decompress();
