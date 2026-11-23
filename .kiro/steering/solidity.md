---
inclusion: fileMatch
fileMatchPattern: "contracts/**/*.sol"
---

# Solidity guidance

- Pin the compiler version in `foundry.toml`; no floating pragmas in `src/`.
- Use custom errors, not revert strings.
- Daily limits: track `spentToday` and `txCountToday` with a day index
  (`block.timestamp / 1 days`); reset when the day index changes. Test the
  boundary at exactly the limit and one wei over.
- Approvals: decode `approve(address,uint256)` and `increaseAllowance` calls
  in the execute path; treat `type(uint256).max` (and amounts above a
  configured cap) as "unlimited" and require the guardian.
- Guardian flow: a pending operation is identified by a hash that includes
  chain id, account address, nonce, target, value and calldata, so a guardian
  signature cannot be replayed on another operation or chain.
- Only the owner can propose; only the guardian can approve or reject; the
  owner cannot change the guardian or raise limits without the guardian.
- Emit events for propose / approve / reject / execute so the UI and demo can
  show them.
- Every rule gets: a passing case, a failing case, and a fuzz test.
- `MockScam` is demo-only: it pulls all approved tokens via `transferFrom`.
  Never deploy it anywhere except the testnet.
