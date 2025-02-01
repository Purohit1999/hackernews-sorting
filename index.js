import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log("Navigating to Hacker News...");
    await page.goto('https://news.ycombinator.com/newest');

    // Wait for articles to load
    await page.waitForSelector('.athing');

    // Extract timestamps (ensure we're only grabbing the Unix timestamp)
    const timestamps = await page.$$eval('.subtext span.age', elements =>
        elements.slice(0, 100).map(el => el.getAttribute('title').split(' ')[1]) // Extract only the Unix timestamp
    );

    console.log("Extracted timestamps:", timestamps);

    // Convert timestamps to numbers for sorting comparison
    const parsedDates = timestamps.map(time => Number(time)); 

    // Check if sorted from newest to oldest
    const isSorted = parsedDates.every((date, i, arr) => i === 0 || arr[i - 1] >= date);

    if (isSorted) {
        console.log("✅ The first 100 articles are correctly sorted from newest to oldest.");
    } else {
        console.log("❌ The articles are NOT sorted correctly.");
    }

    await browser.close();
})();
