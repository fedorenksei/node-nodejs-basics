import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const create = async () => {
  const freshFilePath = join(__dirname, "files/fresh.txt");

  try {
    await writeFile(freshFilePath, "I am fresh and young", { flag: "wx" });
  } catch (err) {
    if (err.code === "EEXIST") {
      throw new Error("FS operation failed");
    }
    throw err;
  }
};

await create();
