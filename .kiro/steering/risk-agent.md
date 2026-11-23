---
inclusion: fileMatch
fileMatchPattern: ["packages/risk/**", "server/**", "app/**/agent/**", "app/**/risk/**"]
---

# Risk engine and agent guidance

## Approval levels (ordered)
`ALLOW < CONFIRM_QUESTIONS < REQUIRE_GUARDIAN < BLOCK`

- The final level is `max(ruleLevel, signalLevel, answerLevel)`.
- `ruleLevel` comes from the contract rules (limits, unlimited approval).
- `signalLevel` comes from deterministic on-chain signals.
- `answerLevel` comes from the user's answers to the confirmation questions.
- The LLM never returns a level. It returns text only:
  `{ explanation: string, questions: string[] }`, validated by schema.

## Signals (deterministic)
- first transfer to this address
- amount > N x the user's median past transfer (N in config)
- address in `demo-scam-labels.json`
- unlimited or very large approval
- simulation shows the user losing all of a token balance
- simulation reverted / failed

## Answers that raise the level
- user says someone is asking them to hurry / stay on the phone
- user was contacted first by "customer support", "police", "bank" etc.
- user does not personally know the recipient
Answer parsing should be rule-based (yes/no buttons or fixed choices) for the
MVP; free text may be shown to the LLM for wording only.

## LLM prompt rules
- Send only: signals, amount, token symbol, short address, simulation summary.
- Never send keys, full history, or personal data.
- Ask for plain, calm language at a reading level suitable for older users.
- Timeout and error => fail closed (`REQUIRE_GUARDIAN`).

## Property-based tests to keep
- For any signals and any LLM output, `final >= ruleLevel`.
- Adding a signal never lowers the level (monotonic).
- LLM error / timeout / invalid JSON => level >= REQUIRE_GUARDIAN.
