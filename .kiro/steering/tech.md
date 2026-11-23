---
inclusion: always
---

# Tech stack

Decisions below were chosen for "zero cost, least moving parts". Do not swap
them for paid services or extra infrastructure without asking the human.

## Account model (decided)
- **Smart contract account, no bundler.** Funds live in the `GuardedAccount`
  contract. The owner's EOA calls `execute(...)` directly and pays gas in
  testnet ETH. All rules (limits, count, unlimited approval, guardian) are
  enforced inside the contract, so the owner key cannot bypass them.
- **Guardian flow is fully on-chain:** over-limit operations are stored with
  `propose(...)`; the guardian page reads pending operations from the
  contract and the guardian calls `approve(id)` (executes) or `reject(id)`.
  No database, no push service.
- Not full ERC-4337: no EntryPoint, bundler or paymaster in the MVP. Keep the
  `execute` / rule logic separable so `validateUserOp` can be added later.
  Say this honestly in the README and pitch.
- ERC-7702 is not used (the owner could bypass rules with the raw EOA key).

## Chain and infrastructure (decided)
- Testnet: **Base Sepolia** (chain id 84532). Low gas, ~2 s blocks.
- RPC: public `https://sepolia.base.org` (read from env `RPC_URL`, so it can be
  swapped for a free provider key if rate-limited).
- Test ETH: Coinbase Developer Platform faucet for Base Sepolia (free, needs a
  Coinbase account). Owner and guardian demo wallets both need a little ETH.
- Explorer for demo links: Base Sepolia BaseScan.
- No bundler, no paymaster, no paid API.
- Assets: ETH + one self-deployed ERC-20 test token (used to demo unlimited
  approval).

## Contracts
- Solidity with Foundry (`forge`, `anvil`, `cast`).
- Fuzz / invariant tests in Foundry for limit and guardian rules.

## App
- TypeScript everywhere outside contracts. Strict mode on.
- Frontend: React + Vite, deployed on **Vercel Hobby (free)**. The public URL
  is what judges open.
- Server: one Vercel serverless function for the LLM call. No other backend.
- Chain client: viem. Wallet connection: injected wallet (MetaMask etc.) on
  Base Sepolia.
- Simulation: `eth_call` against the account's execute path before sending.

## Risk engine and agent
- Pure, deterministic TypeScript module for risk signals and required approval
  level (easy to unit-test and property-test).
- LLM provider: **Google Gemini API free tier** (key from Google AI Studio,
  env `GEMINI_API_KEY`, server-side only). Use the cheapest Flash-Lite model
  AI Studio lists as free; read the model name from env `GEMINI_MODEL`.
- Free-tier quota is small and may run out during judging. Therefore:
  - cache explanations keyed by the signal set (same signals = same text);
  - if the key is missing or quota is exhausted, show a built-in template
    explanation per signal AND keep the level at least REQUIRE_GUARDIAN for
    anything that was not already ALLOW (fail closed, see I-2).
- Only signals go to the LLM (free-tier prompts may be used by Google to
  improve products), never personal data or keys.
- LLM responses must be validated with a schema (e.g. zod). Invalid output =
  fail closed (see `safety-invariants.md` I-2).
- Property-based tests (e.g. fast-check) for "agent can only add friction".

## Conventions
- Language of code, comments, UI text, commit messages: English.
- Conventional commits (`feat:`, `fix:`, `test:` ...).
- Every new rule or check comes with tests in the same change.
