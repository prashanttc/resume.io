import puppeteer from "puppeteer";

export async function generatePDF({ slug, title }) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(slug, { 
      waitUntil: "networkidle0",
      timeout: 30000  // Increased timeout
    });
    
    await page.waitForSelector("#resume", { 
      timeout: 15000 
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}