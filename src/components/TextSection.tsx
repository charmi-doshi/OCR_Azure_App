// src/components/TextSection.tsx
import React from 'react';
import { FileText, Loader2 } from 'lucide-react';

interface TextSectionProps {
  isProcessing: boolean;
  extractedText: string;
}

const TextSection: React.FC<TextSectionProps> = ({ isProcessing, extractedText }) => {
  return (
    <div className="min-h-[300px]">
      {isProcessing ? (
        <div className="flex items-center justify-center gap-3 text-gray-700 h-full">
          <Loader2 className="animate-spin" />
          <span>Processing image...</span>
        </div>
      ) : extractedText && (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20 h-full">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-800">
              Extracted Text
            </h2>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default TextSection;