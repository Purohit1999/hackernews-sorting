# 🚀 Hacker News Sorting Validation using Playwright

## 📌 Project Overview
This project is a **JavaScript automation script** built with [Playwright](https://playwright.dev/) that validates whether the **first 100 articles** on [Hacker News "Newest"](https://news.ycombinator.com/newest) are **sorted from newest to oldest** based on their timestamps.

The script launches a **headless browser**, navigates to Hacker News, extracts timestamps from the first 100 articles, and verifies their sorting order. If sorted correctly, it logs a ✅ success message; otherwise, it logs a ❌ failure message.

---

## 📂 Project Structure
```
📁 hackernews-sorting
 ├── 📄 index.js        # Main Playwright script
 ├── 📄 package.json    # Node.js dependencies and configurations
 ├── 📄 package-lock.json  # Dependency lock file
 ├── 📁 node_modules    # Installed dependencies
 └── 📄 README.md       # Project documentation (this file)
```

---

## 🛠 Technologies Used
- **Node.js** - JavaScript runtime environment
- **Playwright** - End-to-end testing and web automation framework

---

## ⚙️ Installation & Setup
### **1️⃣ Prerequisites**
Before running the script, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Playwright](https://playwright.dev/) (Installed via npm)

### **2️⃣ Clone the Repository**
```sh
git clone https://github.com/Purohit1999/hackernews-sorting.git
cd hackernews-sorting
```

### **3️⃣ Install Dependencies**
```sh
npm install
```

### **4️⃣ Install Playwright Browsers**
```sh
npx playwright install
```

---

## ▶️ Running the Script
To execute the validation script, run:
```sh
node index.js
```

### **Expected Outputs:**
✅ If articles are sorted correctly:
```
✅ The first 100 articles are correctly sorted from newest to oldest.
```
❌ If articles are **not sorted**:
```
❌ The articles are NOT sorted correctly.
```

---

## 📜 How It Works
### **1️⃣ Launching the Browser**
The script uses **Playwright’s Chromium** engine to open Hacker News in a headless browser:
```javascript
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://news.ycombinator.com/newest');
```

### **2️⃣ Extracting Timestamps**
Hacker News timestamps are extracted using the `.subtext span.age` CSS selector:
```javascript
const timestamps = await page.$$eval('.subtext span.age', elements =>
    elements.slice(0, 100).map(el => el.getAttribute('title').split(' ')[1])
);
```

### **3️⃣ Validating Sorting Order**
The script checks if timestamps are sorted **from newest to oldest**:
```javascript
const parsedDates = timestamps.map(time => Number(time));
const isSorted = parsedDates.every((date, i, arr) => i === 0 || arr[i - 1] >= date);
```

### **4️⃣ Logging Results**
```javascript
if (isSorted) {
    console.log("✅ The first 100 articles are correctly sorted from newest to oldest.");
} else {
    console.log("❌ The articles are NOT sorted correctly.");
}
```

---

## 🐞 Troubleshooting
### **Common Issues & Fixes**
1. **Playwright not installed?**
   ```sh
   npm install playwright
   npx playwright install
   ```
2. **Permission Issues?** (Run as administrator/root)
   ```sh
   sudo npm install -g playwright
   ```
3. **Node.js not recognized?**
   - Ensure **Node.js** is installed and added to system PATH.

---

## 🤝 Contributing
Want to improve this script? Feel free to **fork the repository**, make changes, and submit a **pull request**!

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🎯 Author
👨‍💻 **Purohit1999**  
🔗 [GitHub Profile](https://github.com/Purohit1999)  
📧 Email: purohit@example.com

---

### 🚀 **Happy Coding!** 🎉


