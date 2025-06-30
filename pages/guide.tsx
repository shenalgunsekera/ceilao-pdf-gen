import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserGuide() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="flex items-center p-4 border-b border-orange bg-white dark:bg-gray-900">
        <Link href="/" className="flex items-center">
          <Image src="/ceilao-logo.png" alt="Ceilao Logo" width={120} height={60} priority />
        </Link>
        <div className="flex-1" />
        <Link 
          href="/"
          className="px-4 py-2 bg-orange text-white rounded font-semibold hover:bg-orange/90 transition"
        >
          ← Back to App
        </Link>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange mb-4">How to Use Ceilao PDF Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            A beginner-friendly guide to creating and enhancing PDFs with your images.
          </p>
        </div>

        <div className="space-y-8">
          {/* Batch PDF Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-orange mb-4">📄 Creating a Batch PDF from Images</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Select "Batch PDF" Tab</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Click on the "Batch PDF" tab at the top of the page. This mode lets you combine multiple images into a single PDF.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Add a Topic (Optional)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Enter a topic like "Receipts" or "Notes" in the topic field. This will create a title page at the beginning of your PDF.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Upload Your Images</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Method 1:</strong> Drag and drop your image files onto the orange dashed area<br/>
                    <strong>Method 2:</strong> Click the dashed area to open a file picker and select your images
                  </p>
                  <div className="mt-2 p-3 bg-orange/10 rounded border border-orange">
                    <p className="text-sm text-orange font-medium">💡 Tips:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                      <li>• Supported formats: JPG, PNG, WEBP</li>
                      <li>• Maximum file size: 100MB per image</li>
                      <li>• You can select multiple images at once</li>
                      <li>• Images will appear in the order you select them</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Review and Remove (Optional)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    You'll see previews of all your images. Click the "×" button on any image to remove it if needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Generate Your PDF</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Click the "Generate PDF" button. Your PDF will be created and automatically downloaded to your computer.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Enhance PDF Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-orange mb-4">✨ Enhancing an Existing PDF</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Select "Enhance PDF" Tab</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Click on the "Enhance PDF" tab. This mode lets you add images to an existing PDF.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Upload Your Original PDF</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Click "Choose File" and select the PDF you want to enhance. The PDF will be preserved exactly as it is.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Add Images</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Upload the images you want to add to your PDF using the same drag-and-drop or click method.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Enhance and Download</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Click "Enhance & Download". Your enhanced PDF will include the original content plus a topic page and all your new images.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-orange mb-4">🚀 Key Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-medium">No File Size Limits</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm ml-9">
                  Process files up to 100MB each - no server restrictions!
                </p>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-medium">Privacy First</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm ml-9">
                  All processing happens in your browser - files never leave your device.
                </p>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-medium">Instant Processing</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm ml-9">
                  No waiting for uploads or downloads - everything happens locally.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-medium">Multiple Formats</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm ml-9">
                  Support for JPG, PNG, and WEBP image formats.
                </p>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-medium">Drag & Drop</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm ml-9">
                  Easy file upload with drag-and-drop support.
                </p>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-medium">Automatic Download</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm ml-9">
                  PDFs are automatically downloaded when ready.
                </p>
              </div>
            </div>
          </section>

          {/* Troubleshooting Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-orange mb-4">🔧 Troubleshooting</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-orange pl-4">
                <h3 className="font-semibold">PDF won't generate?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Make sure you've selected at least one image file. Check that your files are in JPG, PNG, or WEBP format.
                </p>
              </div>

              <div className="border-l-4 border-orange pl-4">
                <h3 className="font-semibold">File too large?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  The app supports files up to 100MB each. If you're having issues, try resizing your images before uploading.
                </p>
              </div>

              <div className="border-l-4 border-orange pl-4">
                <h3 className="font-semibold">Download not working?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Check your browser's download settings. Some browsers may block automatic downloads - look for a download notification.
                </p>
              </div>

              <div className="border-l-4 border-orange pl-4">
                <h3 className="font-semibold">Images not showing in preview?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Make sure your image files aren't corrupted. Try opening them in another application first.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-orange to-orange/80 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Create Your First PDF?</h2>
            <p className="text-orange-100 mb-6">
              Start creating professional PDFs from your images in just a few clicks!
            </p>
            <Link 
              href="/"
              className="inline-block bg-white text-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Creating PDFs
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
} 