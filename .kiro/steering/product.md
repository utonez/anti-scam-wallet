---
inclusion: always
---

# Product: Anti-Scam Wallet

Tagline: "Scammers pressure. Our agent pauses."

## Problem
People under pressure from scammers (fake customer support, fake investment
"advisors", romance scams) send irreversible on-chain transfers or sign
unlimited token approvals. By the time a family member hears about it, the
funds are gone.

## Who it is for
- Primary user: a non-expert crypto holder (e.g. an older parent) who may be
  targeted by social-engineering scams.
- Guardian: a trusted family member who approves high-risk transactions from
  their own phone.

## What the product does
Every outgoing transaction passes five checks, in this order:

1. **Limits and rules (hard rule, contract)** - per-transaction limit, daily
   limit, daily transaction count. Unlimited token approvals are blocked by
   default. Exceeding any rule requires a guardian signature.
2. **Transaction simulation (hard rule, eth_call)** - simulate before sending
   and show a plain-language message: "After this transaction you will lose ...".
3. **Address risk (on-chain signals + LLM explanation)** - deterministic
   signals (first-time recipient, amount far above history, known scam label)
   decide the risk level. The LLM only explains the reasons in plain language.
4. **Multi-step confirmation (LLM)** - for suspicious transactions the agent
   asks 2-3 questions (e.g. "Is someone asking you to hurry?"). Answers are
   additional risk signals.
5. **Guardian signature (hard rule, multisig)** - for high-risk transactions
   the guardian receives an approval request. Approve = execute, reject = cancel.

## Core promise
The agent can only ADD confirmation steps. It can never approve, release or
execute a transaction on its own. If the agent is wrong, the worst case is one
extra confirmation. See `safety-invariants.md`.

## Hackathon context
- Kiroween 2026, Frankenstein category: an uncertain LLM stitched together with
  irreversible on-chain transactions, made safe by putting the LLM strictly on
  the "explain and ask" side.
- All user-facing text, README and demo video must be in English.
- Demo length < 3 minutes. Demo runs on a public testnet with a self-deployed
  mock scam contract and a self-made scam label list (clearly stated as a
  simulated environment).

## In scope (MVP)
- Smart account with a guardian
- Limits, count limits, unlimited-approval interception
- eth_call simulation with plain-language result
- Address risk: on-chain signals + LLM explanation
- Multi-step confirmation dialogue
- Guardian approval page
- Mock scam contract on testnet for the demo

## Out of scope
- Reading messages from other chat apps
- Private key sharding (MPC)
- Multi-chain and mainnet
- Real scam address database
- Dispute / arbitration flows
