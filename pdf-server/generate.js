import puppeteer from "puppeteer";

export async function generatePDF({ slug, title }) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(slug, { waitUntil: "networkidle0" });
  await page.waitForSelector("#resume", { timeout: 10000 });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
}
