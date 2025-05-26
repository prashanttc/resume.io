import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function generatePDF({ slug, title }) {
  // Configure Chromium
  chromium.setGraphicsMode = false; // Disable GPU if not needed
  const executablePath = await chromium.executablePath();

  const browser = await puppeteer.launch({
    executablePath,
    args: [
      ...chromium.args,
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ],
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();
    
    await page.goto(slug, {
      waitUntil: "networkidle2",
      timeout: 30000
    });

    await page.waitForSelector("#resume", {
      timeout: 15000
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}