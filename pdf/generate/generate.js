import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function generatePDF({ slug, title }) {
  const executablePath = await chromium.executablePath();

  const browser = await puppeteer.launch({
    executablePath,
    args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 1600 });
    await page.emulateMediaType("screen"); // Try "print" if screen doesn't work
    await page.goto(slug, { waitUntil: "networkidle2", timeout: 30000 });

    await page.waitForSelector("#resume", { timeout: 15000 });
 
    // Force background to be white
    await page.addStyleTag({
      content: 'body { background: white !important; }',
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
