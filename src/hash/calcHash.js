import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
  const fileToHashPath = join(__dirname, "files/fileToCalculateHashFor.txt");

  const hash = createHash("sha256");
  createReadStream(fileToHashPath, "utf8")
    .on("data", (chunk) => {
      hash.update(chunk);
    })
    .on("end", () => {
      console.log(hash.digest("hex"));
    });
};

await calculateHash();
