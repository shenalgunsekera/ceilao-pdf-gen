import type { NextApiRequest, NextApiResponse } from 'next';
import { mergeImagesToPDF } from '../../lib/pdfUtils';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import formidable from 'formidable';
import fs from 'fs';

// Ceilao API: Merge images into a single PDF and return the PDF file

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API /api/merge hit:', req.method);
  if (req.method !== 'POST') return res.status(405).end();
  
  try {
    const form = formidable({ multiples: true });
    
    const parseForm = () => {
      return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });
    };

    const { fields, files } = await parseForm() as any;
    
    console.log('Fields:', fields);
    console.log('Files:', files);
    
    const images = Array.isArray(files.images) ? files.images : [files.images];
    const buffers = await Promise.all(images.filter(Boolean).map(f => fs.promises.readFile(f.filepath)));
    
    let pdf;
    if (fields.topic) {
      // Add topic page at the start
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const page = pdfDoc.addPage();
      page.drawText(fields.topic.toString(), {
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
    console.error('PDF generation error:', e);
    res.status(500).json({ error: e.message || 'Failed to generate PDF' });
  }
} 