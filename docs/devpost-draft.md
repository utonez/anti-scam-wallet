# Devpost submission draft

> Draft only. Replace every TODO with what you actually built and observed.
> Judges score how deeply Kiro was used, so the "How we used Kiro" section
> must be written from `docs/kiro-log.md` - real examples, screenshots,
> commits - not generic claims.

## Tagline
Scammers pressure. Our agent pauses.

## Inspiration
Scams rarely beat the technology. They beat the person, by creating urgency:
a fake support agent, a "bank" call, a friend who "needs it right now". On a
blockchain, one rushed click is irreversible. We wanted a wallet that slows
down exactly when someone is being rushed, and brings in a trusted family
member before the money is gone.

## What it does
Every outgoing transaction passes five checks:

1. **Limits and rules (on-chain).** Per-transaction limit, daily limit, daily
   count, and a block on unlimited token approvals. Anything over the rules
   cannot execute without the guardian.
2. **Simulation.** Before sending, the wallet simulates the transaction and
   says in plain English what you will lose - e.g. "All of your TEST tokens
   can be taken by this contract."
3. **Address risk.** Deterministic signals (first-time recipient, amount far
   above your history, a known scam label) decide the risk. An LLM explains
   the reasons in calm, simple language.
4. **Confirmation dialogue.** For risky transfers the agent asks 2-3 short
   questions, like "Is anyone asking you to hurry?" Your answers can only
   raise the risk, never lower it.
5. **Guardian approval (on-chain).** A family member gets the request on
   their phone and approves or rejects it on-chain.

**The core rule: the AI agent can only add confirmation steps; it can never
approve a transaction.** If the agent is wrong, the worst case is one extra
confirmation.

## Why Frankenstein
LLMs are probabilistic; blockchain transactions are irreversible. These two
normally don't belong together. We stitched them together by giving the LLM
only the "explain and ask" job, while contract rules and a human guardian
decide whether money moves.

## How we built it
- Smart contract account (Solidity, Foundry) on Base Sepolia, with rules and
  guardian approval enforced in the contract. TODO: key design details.
- Deterministic risk engine in TypeScript, covered by property-based tests.
- Gemini (free tier) for explanations and questions, behind a schema check;
  any LLM failure falls back to safe template text and requires the guardian.
- React + Vite frontend and guardian page, deployed on Vercel.

## How we used Kiro
TODO - fill each part with concrete examples, numbers and screenshots.

- **Spec-driven development:** We wrote one spec per check (6 specs including
  an initial spike). TODO: how requirements in EARS form shaped the contract
  tests; one place where the spec caught a design mistake; spec vs. vibe
  coding comparison.
- **Steering:** `safety-invariants.md` is always included and states that
  the agent can never release a transaction. File-matched steering gives
  Solidity- and risk-engine-specific rules only when those files are edited.
  TODO: an example where steering changed Kiro's output.
- **Agent hooks:** TODO: results from
  - running `forge test` on every Solidity save,
  - re-checking the safety invariant after risk/agent code changes,
  - blocking writes that contain private keys or API keys,
  - logging every finished spec task to our Kiro log.
- **Property-based testing:** TODO: which properties ("final level is never
  below the rule level", "answers can only raise risk", "LLM failure is never
  ALLOW") and any bug PBT found.
- **MCP / Powers / custom agents:** TODO
- **IDE vs CLI:** TODO

## Challenges we ran into
TODO

## Accomplishments that we're proud of
TODO

## What we learned
TODO

## What's next
- Full ERC-4337 support (EntryPoint + bundler) so the account works with any
  4337 wallet infrastructure.
- Make the risk service an on-chain co-signer so checks 3-4 are enforced
  on-chain, not only in the app.
- Real scam-label feeds and multi-chain support.

## Built with
solidity, foundry, typescript, react, vite, viem, gemini, vercel, base-sepolia, kiro

## Testing instructions for judges
TODO: app URL, how to get Base Sepolia test ETH, guardian page URL, and a
step-by-step path for both the scam scenario and the normal scenario.
