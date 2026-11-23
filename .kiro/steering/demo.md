---
inclusion: manual
---

# Demo script (under 3 minutes)

Use `#demo` in chat when building demo fixtures, seed data or the video.

| Time | Scene |
|------|-------|
| 0:00 | A pressuring fake-support message appears; the user gets ready to transfer. Context only, not a feature. |
| 0:20 | Large transfer to a new address is stopped by the limit rule; guardian signature required. |
| 0:50 | User is led to sign an unlimited approval to the mock scam contract. Simulation shows "All your tokens can be taken". Approval is blocked. |
| 1:30 | Agent explains the address risk and asks questions; the user's answers reveal they are being rushed. |
| 2:00 | Guardian's phone gets the approval request; guardian rejects; transfer cancelled. |
| 2:20 | Contrast: a small split-the-bill transfer to a friend goes through - not everything is blocked. |
| 2:40 | One sentence on how Kiro was used to build it. |

Fixtures needed:
- one "scam" path (new address, large amount, label hit, unlimited approval)
- one "normal" path (known friend, small amount)
- both must be reproducible from a seed script on the testnet
- the video must say this is a simulated environment
