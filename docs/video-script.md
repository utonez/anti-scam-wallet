# Demo video script (target 2:50, hard limit < 3:00)

Recording tips: 1080p, screen capture + one phone (guardian). No copyrighted
music. Say once, on screen, "Simulated environment on Base Sepolia testnet".
Narration is English; add English subtitles.

| Time | Screen | Narration |
|------|--------|-----------|
| 0:00-0:20 | Phone notification: fake "Exchange Support" chat: "Your account is frozen. Move your funds to this safe address within 10 minutes." User opens the wallet. | "This is how most crypto scams work. Not by hacking the blockchain, but by rushing a person. Meet our anti-scam wallet: scammers pressure, our agent pauses." |
| 0:20-0:50 | User sends a large ETH transfer to a new address. Check 1 stops it: "Over your daily limit - needs your guardian." | "Every transfer passes five checks. First, hard limits written into the smart contract. This transfer is over the daily limit, so it simply cannot execute without the guardian - not even if the user insists." |
| 0:50-1:30 | Scam site asks the user to "verify" by approving tokens. Simulation card: "If you approve, ALL of your TEST tokens can be taken." Approval blocked. | "Next, the scammer asks for a token approval. Before anything is signed, we simulate it. In plain English: this would let them take everything. Unlimited approvals are blocked by the contract." |
| 1:30-2:00 | Risk card with reasons (new address, 40x usual amount, flagged address). Agent asks: "Did someone contact you first?" "Is anyone asking you to hurry?" User answers yes. Level rises to "Guardian required". | "Our AI agent explains why this address looks risky, then asks a few simple questions. The answers reveal pressure. Important: the agent can only add steps. It can never approve a transaction." |
| 2:00-2:20 | Guardian's phone: request with amount, reasons and the user's answers. Guardian taps Reject. Wallet shows "Cancelled". BaseScan shows the rejection. | "The request goes to a family guardian, with everything they need to see. They reject it on-chain. The money never left." |
| 2:20-2:40 | User sends a small "split the bill" payment to a known friend. Goes straight through. | "And for everyday payments, nothing gets in the way. A small transfer to a friend just works." |
| 2:40-2:55 | Kiro window: specs, steering, hooks panel. | "We built this with Kiro: one spec per check, a steering rule that the agent can never release funds, and hooks that test every contract change. Anti-Scam Wallet. Scammers pressure. Our agent pauses." |
