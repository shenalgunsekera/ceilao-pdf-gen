import type { NextApiRequest, NextApiResponse } from 'next';
import { mergeImagesToPDF } from '../../lib/pdfUtils';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Only JSON, not files
    },
  },
};

async function fetchImageBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { imageUrls, topic } = req.body;
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return res.status(400).json({ error: 'No image URLs provided' });
  }
  try {
    const buffers = await Promise.all(imageUrls.map(fetchImageBuffer));
    let pdf;
    if (topic) {
      // Add topic page at the start
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const page = pdfDoc.addPage();
      page.drawText(topic.toString(), {
        x: 50,
        y: page.getHeight() - 100,
        size: 32,
        color: rgb(1, 0.647, 0), // orange
        font,
      });
      // Merge images as pages
      const imagesPdf = await PDFDocument.load(await mergeImagesToPDF(buffers));
      const copiedPages = await pdfDoc.copyPages(imagesPdf, imagesPdf.getPageIndices());
      copiedPages.forEach(p => pdfDoc.addPage(p));
      pdf = await pdfDoc.save();
    } else {
      pdf = await mergeImagesToPDF(buffers);
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Batch_${Date.now()}.pdf`);
    res.send(Buffer.from(pdf));
  } catch (e: any) {
    console.error('PDF generation from URLs error:', e);
    res.status(500).json({ error: e.message || 'Failed to generate PDF from URLs' });
  }
} 