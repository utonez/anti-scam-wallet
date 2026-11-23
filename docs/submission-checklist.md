# 準備與交件清單

時間一律換算成台灣時間。官方截止:**12/5(五)06:00**(= 12/4 14:00 PT),不接受遲交。

## A. 帳號(要你們自己申請,都免費)

- [ ] **GitHub**:建一個 public repo(不能用 GitLab / Bitbucket)。About 區要看得到 MIT License。
- [ ] **錢包**:用 MetaMask 開 **3 個全新的測試錢包**:owner(被保護的用戶)、guardian(家人)、friend(對照組小額轉帳)。不要用放過真錢的錢包。
- [ ] **Base Sepolia 測試 ETH**:Coinbase Developer Platform faucet,owner 和 guardian 都要領(雙方都要付 gas)。
- [ ] **Google AI Studio**:建 Gemini API key,在 AI Studio 的 rate limit 頁面看實際的免費額度,選 Flash-Lite 類模型。
- [ ] **Vercel**(Hobby 免費方案):連 GitHub repo 部署。API key 放 Vercel 的 Environment Variables,不放程式碼。
- [ ] **YouTube**:影片上傳後設為**公開**(不能設成不公開)。
- [ ] **Kiro credits**:已申請 ✅。收到 code 後要在 **12/4(PT)前兌換**;兌換後可以用到 12/31。每位隊員各自申請。

拿到的 key 和私鑰都只寫進本機的 `.env`(已在 `.gitignore`)。

## B. 建議時程(剩 11 天)

| 日期 | 做什麼 | 用 Kiro 的哪個 spec |
|---|---|---|
| 11/24–25 | 小驗證:Base Sepolia 上守護者批准一筆、拒絕一筆 | `account-spike` |
| 11/26–27 | 合約規則 + 測試 | `limits-and-rules` |
| 11/27–28 | 模擬 + 風險引擎(可以兩人平行) | `tx-simulation`、`address-risk` |
| 11/29–30 | 對答確認 + 守護者頁面 + UI | `confirm-dialogue`、`guardian-approval` |
| 12/1 | 部署到 Base Sepolia + Vercel,整套 demo 流程跑一遍 | — |
| 12/2 | 錄影、剪輯(< 3 分鐘)、上傳 YouTube | — |
| 12/3 | 寫 Devpost 說明、Kiro 使用說明、README | — |
| 12/4 | 緩衝 + **送件**(不要拖到最後一晚) | — |

## C. Devpost 表單要填的

- [ ] 類別:**Frankenstein**
- [ ] App URL(Vercel)+ 測試說明:評審怎麼拿到測試 ETH、要切到哪條鏈、guardian 頁面網址
- [ ] YouTube 影片連結(< 3 分鐘、公開、沒有版權音樂)
- [ ] GitHub repo 連結
- [ ] 功能說明(英文)→ 草稿在 `docs/devpost-draft.md`
- [ ] **Kiro 使用說明**(英文,評分重點)→ 素材來自 `docs/kiro-log.md`
- [ ] 揭露既有程式碼:只用了標準框架和函式庫(Foundry、viem、React、Vite、OpenZeppelin 若有用)

### Bonus(可疊加)
- [ ] **Best Student Project – Frankenstein**($1,500 + Kiro Pro Max):**全隊都要是學生**。要填每個人的 LinkedIn、學生 email、年級、科系、學校。
- [ ] **Blog**(前 100 名各送 2,000 credits):在第三方平台(Medium、dev.to 等)發表文章,內文要寫明是為 Kiroween 2026 寫的,並在 12/5 06:00 前發布。
- [ ] **Social Blitz**:貼文**第一個字必須是 `#KiroweenHackathon26`**,內容寫你們最喜歡 Kiro 的哪一點、它怎麼改變你們的開發方式。評審會看「原創想法 vs AI 寫的」,**請自己寫**。
- [ ] **Best Demo**:影片品質加分。

## D. 送件前最後檢查

- [ ] `.kiro/` 在 repo 根目錄,而且**沒有**被 `.gitignore` 排除(`git check-ignore -v .kiro` 應該沒有輸出)
- [ ] `.kiro/specs/` 裡有 Kiro 產生的 spec
- [ ] repo 是 public,About 區顯示 MIT License
- [ ] repo 裡沒有 `.env`、私鑰、API key
- [ ] 所有送件資料都是英文(UI、README、影片字幕或旁白)
- [ ] 換一台沒裝過東西的電腦,照 README 能跑起來
- [ ] **評審期到 2027/1/29**:Vercel 網站、Base Sepolia 合約、Gemini key 都要保持可用到那天。額度用完時要走 fail-closed 的模板文字,不能壞掉。
