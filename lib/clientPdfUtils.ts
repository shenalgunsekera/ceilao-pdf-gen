import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Client-side PDF utilities for browser-based PDF generation
// This allows handling files of any size without server limits

const MAX_DIMENSION = 1200; // px
const JPEG_QUALITY = 0.7;   // 70%

/**
 * Resize image using canvas to fit within max dimensions
 */
function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width *= ratio;
        height *= ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw resized image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to blob
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/jpeg', JPEG_QUALITY);
    };
    
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Convert image file to Uint8Array for pdf-lib
 */
async function imageToUint8Array(file: File): Promise<Uint8Array> {
  const resizedBlob = await resizeImage(file);
  const arrayBuffer = await resizedBlob.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

/**
 * Merge images into a single PDF (client-side)
 */
export async function mergeImagesToPDF(files: File[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  for (const file of files) {
    const imgBytes = await imageToUint8Array(file);
    const img = await pdfDoc.embedJpg(imgBytes);
    const dims = img.scale(1);
    const page = pdfDoc.addPage([dims.width, dims.height]);
    page.drawImage(img, { x: 0, y: 0, width: dims.width, height: dims.height });
  }
  
  return await pdfDoc.save();
}

/**
 * Enhance an existing PDF by adding a topic page and appending images (client-side)
 */
export async function enhancePDFWithTopicAndImages(
  pdfFile: File, 
  topic: string, 
  imageFiles: File[]
): Promise<Uint8Array> {
  const pdfBytes = new Uint8Array(await pdfFile.arrayBuffer());
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
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
  for (const file of imageFiles) {
    const imgBytes = await imageToUint8Array(file);
    const img = await pdfDoc.embedJpg(imgBytes);
    const dims = img.scale(1);
    const imgPage = pdfDoc.addPage([dims.width, dims.height]);
    imgPage.drawImage(img, { x: 0, y: 0, width: dims.width, height: dims.height });
  }
  
  return await pdfDoc.save();
}

/**
 * Create a PDF with topic page and images (client-side)
 */
export async function createPDFWithTopicAndImages(
  topic: string, 
  imageFiles: File[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  // Add topic page at the start
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage();
  page.drawText(topic, {
    x: 50,
    y: page.getHeight() - 100,
    size: 32,
    color: rgb(1, 0.647, 0), // orange
    font,
  });
  
  // Add images as pages
  for (const file of imageFiles) {
    const imgBytes = await imageToUint8Array(file);
    const img = await pdfDoc.embedJpg(imgBytes);
    const dims = img.scale(1);
    const imgPage = pdfDoc.addPage([dims.width, dims.height]);
    imgPage.drawImage(img, { x: 0, y: 0, width: dims.width, height: dims.height });
  }
  
  return await pdfDoc.save();
} 