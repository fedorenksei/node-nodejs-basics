import { createReadStream, createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";
const __dirname = dirname(fileURLToPath(import.meta.url));

const compress = async () => {
  const readable = createReadStream(
    join(__dirname, "files/fileToCompress.txt")
  );
  const gzip = createGzip();
  const writable = createWriteStream(join(__dirname, "files/archive.gz"));
  pipeline(readable, gzip, writable);
};

await compress();
