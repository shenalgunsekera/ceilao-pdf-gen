import type { NextApiRequest, NextApiResponse } from 'next';
import { enhancePDFWithTopicAndImages } from '../../lib/pdfUtils';

// Ceilao API: Enhance an existing PDF by adding a topic and appending images

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '30mb',
    },
  },
};

import formidable from 'formidable';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'Upload error' });
    try {
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
    } catch (e) {
      res.status(500).json({ error: 'Failed to enhance PDF' });
    }
  });
} 