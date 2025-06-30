import type { NextApiRequest, NextApiResponse } from 'next';
import { enhancePDFWithTopicAndImages } from '../../lib/pdfUtils';
import formidable from 'formidable';
import fs from 'fs';

// Ceilao API: Enhance an existing PDF by adding a topic and appending images

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API /api/enhance hit:', req.method);
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
    
    const pdfFile = Array.isArray(files.pdf) ? files.pdf[0] : files.pdf;
    if (!pdfFile) return res.status(400).json({ error: 'No PDF uploaded' });
    
    const pdfBuffer = await fs.promises.readFile(pdfFile.filepath);
    const topic = fields.topic?.toString() || 'New Section';
    const images = Array.isArray(files.images) ? files.images : [files.images];
    const buffers = await Promise.all(images.filter(Boolean).map(f => fs.promises.readFile(f.filepath)));
    
    const pdf = await enhancePDFWithTopicAndImages(pdfBuffer, topic, buffers);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=New_${pdfFile.originalFilename?.replace(/\.pdf$/i, '') || 'Enhanced'}_${Date.now()}.pdf`);
    res.send(Buffer.from(pdf));
  } catch (e: any) {
    console.error('PDF enhancement error:', e);
    res.status(500).json({ error: e.message || 'Failed to enhance PDF' });
  }
} 