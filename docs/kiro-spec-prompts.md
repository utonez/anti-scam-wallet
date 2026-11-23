# 在 Kiro 裡建立五份 Spec 的提示詞

`.kiro/specs/` 故意留空:spec 要由 Kiro 產生,評審才看得到真實的 spec-driven 流程。
做法:在 Kiro 的 Spec 模式貼上下面的提示詞,檢查 Kiro 產出的 `requirements.md`(EARS 格式)→ 核准 → `design.md` → 核准 → `tasks.md`,再逐一執行 task。
每份 spec 改過什麼、為什麼改,記在 `docs/kiro-log.md`,寫說明時會用到。

建議順序:先做 **0. account-spike**(小驗證:Base Sepolia 上守護者批准一筆轉帳),再做 1 → 5。2 和 3 可以平行。

---

## 0. account-spike(第一週小驗證)

```
Create a spec named "account-spike". Goal: prove on Base Sepolia that one
transfer which needs the guardian can run end to end with the GuardedAccount
smart contract account (no bundler, see .kiro/steering/tech.md). Keep it
minimal: deploy the account with an owner and a guardian, fund it, owner
proposes one over-limit ETH transfer, guardian approves on-chain, transfer
executes; a second proposal is rejected and never executes. Include a Foundry
deploy script that reads keys and RPC_URL from .env, and a local anvil test of
the same flow.
```

## 1. limits-and-rules(第一關:額度與規則,合約)

```
Create a spec named "limits-and-rules" for the guarded smart account contract.
Requirements: per-transaction limit, daily amount limit, daily transaction
count limit, block unlimited ERC-20 approvals by default, and require a
guardian signature for anything that exceeds a rule. Owner proposes, guardian
approves or rejects, approval executes, rejection cancels. Owner cannot change
the guardian or raise limits alone. Write requirements in EARS. In the design,
include the operation hash (chain id, account, nonce, target, value, calldata)
and events. Tasks must include unit tests and Foundry fuzz/invariant tests for
every rule. Follow .kiro/steering/solidity.md and safety-invariants.md.
```

## 2. tx-simulation(第二關:交易模擬)

```
Create a spec named "tx-simulation". Before any transaction is sent, simulate
it with eth_call against the account's execute path and produce a
plain-English summary of what the user will lose (ETH amount, token amount,
"all of your <TOKEN> can be taken" for unlimited approvals). If simulation
reverts or fails, say so clearly and require the guardian (fail closed).
Output must be a typed object usable by the risk engine and by the UI.
```

## 3. address-risk(第三關:地址風險)

```
Create a spec named "address-risk". A pure TypeScript risk engine in
packages/risk computes deterministic signals: first transfer to this address,
amount far above the user's history, address in demo-scam-labels.json,
unlimited approval, simulation shows total loss, simulation failed. It maps
signals to an approval level (ALLOW < CONFIRM_QUESTIONS < REQUIRE_GUARDIAN <
BLOCK). A separate server route asks the LLM ONLY for a plain-language
explanation of those signals, validated by schema. Enable property-based
tests: final level is never below the rule level; adding a signal never lowers
the level; LLM error/timeout/invalid output gives at least REQUIRE_GUARDIAN.
Follow .kiro/steering/risk-agent.md.
```

## 4. confirm-dialogue(第四關:多步對答確認)

```
Create a spec named "confirm-dialogue". When the level is CONFIRM_QUESTIONS or
higher, the agent shows 2-3 short questions written by the LLM (e.g. "Did
someone contact you first and ask you to send this?", "Is anyone asking you to
hurry?"). Answers are fixed choices, parsed by rules, never by the LLM. Risky
answers raise the level; no answer can lower it. Plain, calm English suitable
for older users. Include property-based tests for "answers can only raise".
```

## 5. guardian-approval(第五關:家人簽名)

```
Create a spec named "guardian-approval". A mobile-friendly guardian page shows
a pending request: amount, recipient, simulation summary, risk reasons, and the
user's answers. Guardian can approve (signs, transaction executes) or reject
(operation cancelled). The page must work from a link on a phone. Include an
end-to-end test of reject and approve on a local chain.
```

---

## 讓 Kiro 說明更完整的其他做法

規則列出的評分項目,每項至少留一個證據:

| 項目 | 已準備 | 你們要做的 |
|---|---|---|
| Spec-driven | 上面的提示詞 | 在 Kiro 產生並執行;記下 spec 和 vibe coding 的差異 |
| Steering | `.kiro/steering/` 共 7 份(always / fileMatch / manual 三種) | 依實際決定更新 `tech.md` 的 TBD |
| Agent hooks | `.kiro/hooks/` 共 4 個 | 實際觸發時截圖 |
| PBT | spec 3、4 的提示詞已要求 | 記錄 PBT 抓到的 bug |
| MCP | 未建立 | 在 Kiro 加一個 MCP(設定檔在 `.kiro/settings/mcp.json`),例如讀 EIP / bundler 文件 |
| Custom agents / Powers | 未建立 | 試一個 Power,或做一個 "contract reviewer" custom agent |
| IDE / CLI / Web 比較 | — | 至少用兩種,並寫下差異 |
