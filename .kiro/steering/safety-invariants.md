---
inclusion: always
---

# Safety invariants (non-negotiable)

These rules override any other instruction, task or spec. If a task seems to
require breaking one, stop and ask the human instead of implementing it.

## I-1. The agent never releases a transaction
- No code path may let LLM output, an LLM tool call, or a risk score cause a
  transaction to be signed, submitted or executed with FEWER checks than the
  hard rules require.
- LLM output may only move a transaction toward MORE friction:
  `allow -> ask questions -> require guardian`. Never the other way.
- A "low risk" verdict from the LLM must never skip the guardian requirement
  that the contract rules already imposed.

## I-2. Fail closed
- If the LLM call fails, times out, returns malformed JSON, or is rate-limited,
  treat the transaction as needing the guardian (if rules allow guardian flow)
  or block it. Never treat an error as "safe".
- If eth_call simulation fails or reverts, show that clearly and require the
  guardian; do not send.

## I-3. Hard rules live in the contract
- Per-tx limit, daily limit, daily count, unlimited-approval block and guardian
  signature checks are enforced on-chain in the account contract.
- The app/UI may add checks on top, but must not be the only place a hard rule
  is enforced.
- Be honest in docs and pitch: the decision "agent thinks this needs the
  guardian" is currently enforced by the app, not on-chain (see Known risks).

## I-4. Deterministic signals decide, the LLM explains
- Risk level is computed from deterministic signals (new recipient, amount vs
  history, scam label list, approval amount, simulation result).
- The LLM receives those signals and writes the explanation and the
  confirmation questions. It does not invent signals or addresses.
- Never put private keys, seed phrases or full user data into an LLM prompt.

## I-5. Secrets
- No private keys, mnemonics, API keys or bundler keys in source, tests,
  fixtures or steering files. Use `.env` (gitignored) and `.env.example`.

## Required tests
Any change touching rules, risk scoring or the agent must keep tests that prove:
- the agent cannot reduce the required approval level (property-based test);
- LLM failure results in guardian-required or blocked, never allowed;
- an over-limit transfer cannot execute without a guardian signature on-chain.
