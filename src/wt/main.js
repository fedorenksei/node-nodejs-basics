import { cpus } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
  const STARTING_N = 10;
  const cpusNumber = cpus().length;
  const results = [];
  for (let i = 0; i < cpusNumber; i++) {
    const worker = new Worker(join(__dirname, "worker.js"), {
      workerData: STARTING_N + i,
    });
    const promise = new Promise((resolve) => {
      let result;
      worker
        .on("message", (value) => {
          result = value;
        })
        .on("error", () => {})
        .on("exit", () => {
          resolve({
            status: result ? "success" : "error",
            data: result || null,
          });
        });
    });
    results.push(promise);
  }
  console.log(await Promise.all(results));
};

await performCalculations();
