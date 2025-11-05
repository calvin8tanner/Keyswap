# How to Run Keyswap Locally

## 🚀 Quick Start

### Step 1: Make Sure You Have Node.js Installed
Check by running:
```bash
node --version
```
If you don't have it, download from [nodejs.org](https://nodejs.org)

### Step 2: Clone/Download the Repository
If you haven't already, get the code on your local machine:
```bash
git clone https://github.com/calvin8tanner/Keyswap.git
cd Keyswap
```

### Step 3: Install Dependencies
Run this command in the Keyswap folder:
```bash
npm install
```
This will take 1-2 minutes.

### Step 4: Start the Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
Open your web browser and go to:
```
http://localhost:3000
```

You should see the Keyswap website! 🎉

---

## 🔧 Troubleshooting

### Port Already in Use
If you see an error about port 3000 being in use:
```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### "Cannot find module" errors
Delete node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Blank Page
Open browser DevTools (F12) and check the Console tab for errors. Share any error messages you see.

---

## 📝 Other Commands

**Stop the server:**
Press `Ctrl + C` in the terminal

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

---

## ⚙️ Optional: Set Up Backend

To enable login, property listings, and other features:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the `.env.example` file to `.env`
4. Add your Supabase credentials to `.env`
5. Restart the dev server

See `BACKEND_SETUP.md` for detailed instructions.

---

## 🆘 Still Not Working?

**What's the issue?**
- [ ] Can't access localhost:3000 in browser
- [ ] Seeing a blank page
- [ ] Getting specific error messages
- [ ] Something else

**Share:**
1. What error messages you see (if any)
2. Screenshot of what you see in the browser
3. Any console errors (press F12 → Console tab)

I'm here to help! 🙌
