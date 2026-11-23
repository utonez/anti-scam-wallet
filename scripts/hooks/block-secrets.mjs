// Kiro PreToolUse hook: blocks agent writes that look like they contain secrets.
// Kiro passes the event as JSON on STDIN. Exit code 2 blocks the tool call.
// Writes whose target path ends in ".env" (gitignored) are allowed.

const SECRET_PATTERNS = [
  // PRIVATE_KEY=0xabc... / "privateKey": "abc..." (64 hex chars)
  // (STDIN is JSON, so quotes inside file content arrive escaped as \")
  /(private[_-]?key|priv[_-]?key|secret|mnemonic)[\\"'\s]*[:=]\s*[\\"']*(0x)?[0-9a-fA-F]{64}\b/i,
  // Common API key prefixes
  /\bsk-ant-[A-Za-z0-9_-]{20,}/,
  /\bsk-[A-Za-z0-9]{32,}/,
  /\bAKIA[0-9A-Z]{16}\b/,
];

const ENV_FILE_PATH = /["'](?:[^"']*[\\/])?\.env["']/;

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

const payload = await readStdin();

if (ENV_FILE_PATH.test(payload)) {
  process.exit(0);
}

const hit = SECRET_PATTERNS.find((pattern) => pattern.test(payload));
if (hit) {
  process.stderr.write(
    "Blocked: this write looks like it contains a private key or API key. " +
      "Put secrets in .env (gitignored) and reference them via process.env / vm.envOr. " +
      "See .kiro/steering/safety-invariants.md I-5.\n",
  );
  process.exit(2);
}

process.exit(0);
