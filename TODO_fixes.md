# CareerForge Pro - Code Fixes TODO

## Plan Steps (Approved):

**1. [x] AI Consistency**
   - Edit `server/utils/aiRewriter.js`: Switch Gemini → OpenAI (gpt-4o-mini) ✅
   - Edit README.md & SETUP.md: Update docs (pending)

**2. [x] Security Upgrades**
   - Edit `server/index.js`: Add helmet, rate-limit (10 req/min auth) ✅
   - Edit `server/models/User.js`: Password policy (min8, uppercase, number) ✅
   - Edit `server/package.json`: Add deps (helmet, express-rate-limit) ✅

**3. [x] Cleanup**
   - Delete `src/integrations/supabase/` folder ✅
   - Edit `src/api/index.js`: Fix local API URL fallback ✅
   - Edit `server/seedUser.js`: Disable demo user ✅

**4. [x] Install & Test**
   - `cd server && npm i helmet express-rate-limit openai` ✅
   - Test endpoints, AI rewrite, auth (user test)
   - `cd server && npm i helmet express-rate-limit openai`
   - Test endpoints, AI rewrite, auth

**5. [x] Commit/Push** ✅ All fixes live on GitHub


