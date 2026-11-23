# Anti-Scam Wallet

> Scammers pressure. Our agent pauses.

A smart-contract wallet for people who are targeted by social-engineering
scams. Before money leaves the wallet, it goes through five checks: hard
limits, transaction simulation, address risk, a short confirmation dialogue,
and - for high-risk transfers - approval from a family guardian.

**The AI agent can only add confirmation steps. It can never approve a
transaction.** If the agent is wrong, the worst case is one extra
confirmation.

Built for **Kiroween 2026** (Frankenstein category) with
[Kiro](https://kiro.dev). See [How we used Kiro](#how-we-used-kiro).

> ⚠️ Testnet only (Base Sepolia). The "scam" contract and scam labels in this
> repo are simulated fixtures for the demo, not real data.

## Live demo

- App: _TODO: Vercel URL_
- Guardian page: _TODO_
- Demo video (YouTube, < 3 min): _TODO_
- Contracts on Base Sepolia: _TODO: BaseScan links_

## How it works

| # | Check | Type | What it does |
|---|-------|------|--------------|
| 1 | Limits and rules | Hard rule (contract) | Per-tx limit, daily limit, daily count, blocks unlimited token approvals. Anything over the rules needs the guardian. |
| 2 | Simulation | Hard rule (`eth_call`) | Shows in plain English what you will lose before you send. |
| 3 | Address risk | On-chain signals + LLM | Deterministic signals decide the risk; the LLM only explains them. |
| 4 | Confirmation dialogue | LLM | 2-3 questions such as "Is anyone asking you to hurry?" Answers can only raise the risk. |
| 5 | Guardian approval | Hard rule (on-chain) | The guardian approves (executes) or rejects (cancels) on-chain. |

### Why this is a Frankenstein

LLMs are uncertain; on-chain transactions are irreversible. We stitch them
together by keeping the LLM strictly on the "explain and ask" side, while
releasing funds is decided only by contract rules and a human guardian.

## Architecture

_TODO: diagram_

- `contracts/` - Foundry project: `GuardedAccount`, `TestToken`, `MockScam` (demo only)
- `packages/risk/` - deterministic risk engine (pure TypeScript, property-tested)
- `app/` - wallet UI and guardian approval page (React + Vite)
- `server/` - one serverless function that calls the LLM
- `.kiro/` - Kiro specs, steering and hooks

## Run locally

_TODO: filled in as the project is built._

```bash
cp .env.example .env
# contracts
forge test --root contracts
```

## Known limitations

- Not full ERC-4337 yet: the owner's wallet calls the account contract
  directly (no bundler / EntryPoint). The rules are still enforced on-chain.
- The decision "the agent thinks this needs the guardian" (checks 3-4) is
  enforced by the app, not on-chain. Contract rules (check 1) and guardian
  approval (check 5) are enforced on-chain. Making the risk service a
  co-signer is future work.
- Scam labels are a hand-made list for the demo.

## How we used Kiro

_TODO: summarise from `docs/kiro-log.md` - specs, steering, hooks, PBT, MCP._

## License

[MIT](LICENSE)
