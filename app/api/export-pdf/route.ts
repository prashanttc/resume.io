import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request:Request) {
  const { resumeId,title } = await request.json();
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; 
  const resumeUrl = `${baseUrl}/${resumeId}/preview`;

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(resumeUrl, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${title}.pdf`,
      },
    });
  } catch (error) {
    console.error('PDF generation failed:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
