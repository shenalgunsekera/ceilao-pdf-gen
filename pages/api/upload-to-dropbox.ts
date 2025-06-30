import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadToDropbox(filePath: string, fileName: string) {
  const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Missing Dropbox access token in environment variables.');
  }

  const fileContent = fs.readFileSync(filePath);
  const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({
        path: `/${fileName}`,
        mode: 'add',
        autorename: true,
        mute: false
      })
    },
    body: fileContent
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Dropbox upload failed: ${error}`);
  }

  return await response.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new formidable.IncomingForm();
    
    const parseForm = () => {
      return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });
    };

    const { fields, files } = await parseForm() as any;
    
    const file = files.file;
    const uploadedFile = Array.isArray(file) ? file[0] : file;
    
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await uploadToDropbox(uploadedFile.filepath, uploadedFile.originalFilename);
    
    res.status(200).json({ 
      success: true, 
      file: {
        id: result.id,
        name: uploadedFile.originalFilename,
        path: result.path_display
      }
    });
  } catch (e: any) {
    console.error('Upload error:', e);
    res.status(500).json({ error: e.message });
  }
} 