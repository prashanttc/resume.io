import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

let browser;
let queue = Promise.resolve(); // simple serial queue

export async function initBrowser() {
  if (!browser || !browser.isConnected()) {
    const executablePath = await chromium.executablePath();
    browser = await puppeteer.launch({
      executablePath,
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      headless: chromium.headless,
    });
  }
  return browser;
}

// Simple concurrency limiter: queues requests serially to avoid too many pages open
function enqueue(fn) {
  queue = queue.then(() => fn()).catch(() => {}); // ignore errors in queue to not block next tasks
  return queue;
}

export async function generatePDF({ slug, title }) {
  // Wrap the entire operation in queue to limit concurrency
  return enqueue(async () => {
    const browser = await initBrowser();
    const page = await browser.newPage();

    try {
      await page.setViewport({ width: 1200, height: 1600 });
      await page.emulateMediaType("print");

      await page.goto(slug, { waitUntil: "networkidle2", timeout: 30000 });

      await page.addStyleTag({
        content: `
          html, body {
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        `,
      });

      await page.waitForSelector("#resume", { timeout: 15000 });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
      });
      return pdfBuffer;
    } catch (err) {
      console.error("PDF generation error:", err);
      throw err; // let caller handle error
    } finally {
      await page.close();
    }
  });
}

// Graceful shutdown
async function closeBrowser() {
  if (browser) {
    try {
      await browser.close();
      browser = null;
    } catch (e) {
      console.warn("Error closing browser", e);
    }
  }
}

process.on("exit", () => {
  closeBrowser();
});
process.on("SIGINT", () => {
  closeBrowser().then(() => process.exit());
});
process.on("SIGTERM", () => {
  closeBrowser().then(() => process.exit());
});
