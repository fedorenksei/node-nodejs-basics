import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const transform = async () => {
  const reversing = new Transform({
    transform(chunk, encoding, callback) {
      callback(
        null,
        chunk.toString().replace(/\n$/, "").split("").reverse().join("") + "\n"
      );
    },
  });
  pipeline(stdin, reversing, stdout);
};

await transform();
