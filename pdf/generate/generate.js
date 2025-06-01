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
  margin: {
    top: "0.3in",
    bottom: "0.3in",
  },
});
