import React, { useState } from 'react';
import Image from 'next/image';
import FileUploader from '../components/FileUploader';
import DarkModeToggle from '../components/DarkModeToggle';

const TABS = [
  { key: 'batch', label: 'Batch PDF' },
  { key: 'enhance', label: 'Enhance PDF' },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('batch');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="flex items-center p-4 border-b border-orange bg-white dark:bg-gray-900">
        <Image src="/ceilao-logo.png" alt="Ceilao Logo" width={120} height={60} priority />
        <div className="flex-1" />
        <DarkModeToggle />
      </header>
      <main className="max-w-2xl mx-auto p-4">
        <div className="flex space-x-4 mb-6 mt-6">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-t font-semibold focus:outline-none transition-colors duration-150 ${activeTab === tab.key ? 'bg-orange text-white' : 'bg-white dark:bg-gray-800 text-orange border border-orange'}`}
              aria-label={`Switch to ${tab.label}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'batch' ? <BatchPDFForm /> : <EnhancePDFForm />}
      </main>
    </div>
  );
}

function BatchPDFForm() {
  return (
    <section aria-labelledby="batch-pdf-title">
      <h2 id="batch-pdf-title" className="text-xl font-semibold mb-4 text-orange">Batch PDF Generator</h2>
      <FileUploader mode="images" />
    </section>
  );
}

function EnhancePDFForm() {
  const [topic, setTopic] = useState('');
  return (
    <section aria-labelledby="enhance-pdf-title">
      <h2 id="enhance-pdf-title" className="text-xl font-semibold mb-4 text-orange">Enhance Existing PDF</h2>
      <form className="space-y-4">
        <label className="block text-sm font-medium text-orange" htmlFor="topic">Topic</label>
        <input
          id="topic"
          name="topic"
          type="text"
          className="w-full px-3 py-2 border border-orange rounded focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Enter topic (e.g. Receipts, Notes)"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          aria-label="Topic for new section"
        />
        <FileUploader mode="enhance" topic={topic} />
      </form>
    </section>
  );
} 