import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import sharp from 'sharp';

// Ceilao PDF utilities: merge and enhance PDFs using pdf-lib

const MAX_DIMENSION = 1200; // px
const JPEG_QUALITY = 70;    // percent

/**
 * Merge images into a single PDF.
 * @param images Array of image buffers
 * @returns PDF buffer
 */
export async function mergeImagesToPDF(images: Buffer[] | Uint8Array[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  for (const imgBytes of images) {
    // Resize and compress to JPEG, fit inside box, no crop, no enlarge
    const jpegBuffer = await sharp(imgBytes)
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY })
      .toBuffer();
    const img = await pdfDoc.embedJpg(jpegBuffer);
    const dims = img.scale(1);
    const page = pdfDoc.addPage([dims.width, dims.height]);
    page.drawImage(img, { x: 0, y: 0, width: dims.width, height: dims.height });
  }
  return await pdfDoc.save();
}

/**
 * Enhance an existing PDF by adding a topic page and appending images.
 * @param pdfBuffer Original PDF buffer
 * @param topic Topic string
 * @param images Array of image buffers
 * @returns Enhanced PDF buffer
 */
export async function enhancePDFWithTopicAndImages(pdfBuffer: Buffer | Uint8Array, topic: string, images: Buffer[] | Uint8Array[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  // Add topic as a new page
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  page.drawText(topic, {
    x: 50,
    y: page.getHeight() - 100,
    size: 32,
    color: rgb(1, 0.647, 0), // orange
    font,
  });
  // Append images as new pages
  for (const imgBytes of images) {
    const jpegBuffer = await sharp(imgBytes)
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY })
      .toBuffer();
    const img = await pdfDoc.embedJpg(jpegBuffer);
    const dims = img.scale(1);
    const imgPage = pdfDoc.addPage([dims.width, dims.height]);
    imgPage.drawImage(img, { x: 0, y: 0, width: dims.width, height: dims.height });
  }
  return await pdfDoc.save();
} 