// OcrResult.tsx
import React from 'react';
import { FileText } from 'lucide-react';

interface OcrResultProps {
  extractedText: string;
}

const OcrResult: React.FC<OcrResultProps> = ({ extractedText }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20 h-full">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-800">Extracted Text</h2>
      </div>
      <p className="text-gray-700 whitespace-pre-wrap">{extractedText}</p>
    </div>
  );
};

export default OcrResult;
