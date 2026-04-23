import { spawn } from "node:child_process";
import process from "node:process";
import { findAvailablePort } from "./find-port.mjs";

const mode = process.argv[2]; // "dev" | "start"
if (mode !== "dev" && mode !== "start") {
  console.error('Usage: node scripts/run-next.mjs <dev|start>');
  process.exit(1);
}

const host = process.env.HOST ?? "0.0.0.0";
const startPort = Number.isFinite(Number(process.env.PORT)) ? Number(process.env.PORT) : 3000;

const port = await findAvailablePort({ startPort, host, maxAttempts: 50 });

// Log once, clearly, for production diagnostics.
console.log(`[server] ${mode} listening on http://${host === "0.0.0.0" ? "localhost" : host}:${port}`);

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["next", mode, "-H", host, "-p", String(port)],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      // Keep PORT aligned for any code that reads it.
      PORT: String(port),
      HOST: host,
    },
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

