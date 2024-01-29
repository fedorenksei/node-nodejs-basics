import { spawn } from "node:child_process";

const spawnChildProcess = async (args) => {
  const childProcess = spawn(
    "node",
    ["src/cp/files/script.js", ...(args || [])],
    {
      stdio: [null, null, null, "ipc"],
    }
  );
  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
