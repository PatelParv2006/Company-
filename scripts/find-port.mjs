import net from "node:net";

function parsePort(value, fallback) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 && n < 65536 ? n : fallback;
}

async function isPortFree(port, host) {
  return await new Promise((resolve) => {
    const server = net.createServer();

    const cleanup = () => {
      server.removeAllListeners();
      try {
        server.close();
      } catch {
        // ignore
      }
    };

    server.once("error", (err) => {
      cleanup();
      if (err && typeof err === "object" && "code" in err && err.code === "EADDRINUSE") {
        resolve(false);
        return;
      }

      // Treat other errors as "not usable" for safety.
      resolve(false);
    });

    server.once("listening", () => {
      cleanup();
      resolve(true);
    });

    // Using listen() without backlog; immediately close on success.
    server.listen({ port, host, exclusive: true });
  });
}

export async function findAvailablePort({
  startPort = 3000,
  host = "0.0.0.0",
  maxAttempts = 100,
} = {}) {
  const first = parsePort(process.env.PORT, startPort);

  for (let i = 0; i < maxAttempts; i += 1) {
    const candidate = first + i;
    // Skip invalid ports after overflow.
    if (candidate <= 0 || candidate >= 65536) break;

    // eslint-disable-next-line no-await-in-loop
    const free = await isPortFree(candidate, host);
    if (free) return candidate;
  }

  throw new Error(
    `No free port found starting at ${first} (attempted ${maxAttempts} ports).`
  );
}

