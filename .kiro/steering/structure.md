---
inclusion: always
---

# Repository structure (target)

```
/.kiro/                 Kiro specs, steering, hooks, settings (MUST be committed)
/contracts/             Foundry project
  src/                  GuardedAccount, TestToken, MockScam (demo only)
  test/                 unit, fuzz and invariant tests
  script/               deploy scripts
/app/                   wallet UI + guardian approval page
/server/                LLM route only (Vercel function); guardian requests live on-chain
/packages/risk/         deterministic risk engine (pure TS, no I/O)
/scripts/hooks/         helper scripts used by .kiro/hooks
/docs/
  kiro-log.md           running log of how Kiro helped or failed (for write-up)
  kiro-spec-prompts.md  prompts used to create each spec in Kiro
LICENSE                 open-source license (required by the hackathon)
README.md               English, with setup + testnet URLs
.env.example            every required env var, no real values
```

Rules:
- Never add `.kiro/` or any of its sub-folders to `.gitignore`.
- Keep the risk engine free of network calls so it can be property-tested.
- Mock scam contract and scam label list are demo fixtures; name them clearly
  (`MockScam`, `demo-scam-labels.json`) so nobody mistakes them for real data.
