import React, { useRef, useState } from 'react';

// Ceilao FileUploader: Drag-and-drop uploader with previews, progress, and error handling

interface FileUploaderProps {
  mode: 'images' | 'enhance';
  topic?: string;
}

interface UploadFile {
  file: File;
  preview: string;
  progress: number;
  uploading: boolean;
  error?: string;
  canceled?: boolean;
}

const MAX_SIZE_MB = 30;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ACCEPTED_PDF_TYPE = 'application/pdf';

export default function FileUploader({ mode, topic }: FileUploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [batchTopic, setBatchTopic] = useState('');

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFiles = (fileList: FileList) => {
    const arr = Array.from(fileList);
    if (mode === 'enhance') {
      // First file can be PDF, rest images
      const pdf = arr.find(f => f.type === ACCEPTED_PDF_TYPE);
      if (pdf) setPdfFile(pdf);
      const images = arr.filter(f => ACCEPTED_IMAGE_TYPES.includes(f.type));
      addFiles(images);
    } else {
      addFiles(arr.filter(f => ACCEPTED_IMAGE_TYPES.includes(f.type)));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(f => f.size <= MAX_SIZE_MB * 1024 * 1024);
    const tooLarge = newFiles.find(f => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (tooLarge) setError(`File too large: ${tooLarge.name}`);
    setFiles(prev => [
      ...prev,
      ...validFiles.map(f => ({
        file: f,
        preview: URL.createObjectURL(f),
        progress: 0,
        uploading: false,
      })),
    ]);
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const removePdf = () => setPdfFile(null);

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const onSelectPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]?.type === ACCEPTED_PDF_TYPE) {
      setPdfFile(e.target.files[0]);
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const onUpload = async () => {
    setError(null);
    setLoading(true);
    const form = new FormData();
    if (mode === 'enhance') {
      if (!pdfFile) {
        setError('Please select a PDF file.');
        setLoading(false);
        return;
      }
      form.append('pdf', pdfFile);
      if (topic) form.append('topic', topic);
    }
    if (mode === 'images' && batchTopic) {
      form.append('topic', batchTopic);
    }
    files.forEach(f => form.append('images', f.file));
    // Debug: Log form data keys and file sizes
    for (let pair of form.entries()) {
      if (pair[1] instanceof File) {
        console.log('Uploading file:', pair[0], (pair[1] as File).name, (pair[1] as File).size);
      } else {
        console.log('Form field:', pair[0], pair[1]);
      }
    }
    try {
      const endpoint = mode === 'images' ? '/api/merge' : '/api/enhance';
      console.log('Uploading to endpoint:', endpoint);
      const res = await fetch(endpoint, {
        method: 'POST',
        body: form,
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to generate PDF: ${res.status} ${res.statusText} - ${errText}`);
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
      if (mode === 'images') {
        a.download = `ceilao_doc_${randomNum}.pdf`;
      } else {
        a.download = pdfFile ? `ceilao_doc_${randomNum}.pdf` : `ceilao_doc_${randomNum}.pdf`;
      }
      a.href = url;
      a.click();
      window.URL.revokeObjectURL(url);
      setFiles([]);
      setPdfFile(null);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {mode === 'images' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-orange mb-1" htmlFor="batch-topic">Topic (optional)</label>
          <input
            id="batch-topic"
            name="batch-topic"
            type="text"
            className="w-full px-3 py-2 border border-orange rounded focus:outline-none focus:ring-2 focus:ring-orange"
            placeholder="Enter topic (e.g. Receipts, Notes)"
            value={batchTopic}
            onChange={e => setBatchTopic(e.target.value)}
            aria-label="Topic for batch PDF"
          />
        </div>
      )}
      {mode === 'enhance' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-orange mb-1">PDF File</label>
          {pdfFile ? (
            <div className="flex items-center space-x-2">
              <span className="truncate max-w-xs">{pdfFile.name}</span>
              <button type="button" className="text-orange underline" onClick={removePdf} aria-label="Remove PDF">Remove</button>
            </div>
          ) : (
            <input type="file" accept="application/pdf" onChange={onSelectPdf} aria-label="Select PDF file" className="block" />
          )}
        </div>
      )}
      <div
        className="border-2 border-dashed border-orange rounded-lg p-6 text-center cursor-pointer bg-orange/5 hover:bg-orange/10 transition mb-4"
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        tabIndex={0}
        aria-label="File drop zone"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={mode === 'enhance' ? ACCEPTED_IMAGE_TYPES.join(',') : [...ACCEPTED_IMAGE_TYPES].join(',')}
          multiple
          className="hidden"
          onChange={onSelectFiles}
          aria-label="Select image files"
        />
        <p className="text-orange font-semibold">Drag and drop images here, or <span className="underline">select files</span></p>
        <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP. Max {MAX_SIZE_MB}MB each.</p>
      </div>
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {files.map((f, idx) => (
            <div key={idx} className="relative group">
              <img src={f.preview} alt={f.file.name} className="w-full h-24 object-cover rounded border border-orange" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-orange text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 focus:outline-none"
                onClick={e => { e.stopPropagation(); removeFile(idx); }}
                aria-label={`Remove ${f.file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <div className="text-red-600 mb-2" role="alert">{error}</div>}
      <button
        type="button"
        className="w-full py-2 px-4 bg-orange text-white rounded font-semibold hover:bg-orange/90 transition disabled:opacity-50"
        onClick={onUpload}
        disabled={loading || (mode === 'enhance' ? !pdfFile || files.length === 0 : files.length === 0)}
        aria-label={mode === 'enhance' ? 'Enhance & Download' : 'Generate PDF'}
      >
        {loading ? 'Processing...' : mode === 'enhance' ? 'Enhance & Download' : 'Generate PDF'}
      </button>
    </div>
  );
} 