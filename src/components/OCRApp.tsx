import React, { useState } from 'react';
import { getOCRText } from './OCRService';

const OCRApp: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      
      // Create an image URL for preview
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    }
  };

  // Parse OCR response based on its structure
  const parseOCRResponse = (result: any): string => {
    console.log('Parsing OCR response:', result);

    if (result.regions) {
      return result.regions
        .map((region: any) =>
          region.lines
            ?.map((line: any) =>
              line.words
                ?.map((word: any) => word.text)
                .join(' ') || line.text
            )
            .join('\n')
        )
        .join('\n\n');
    }

    if (result.recognitionResults) {
      return result.recognitionResults
        .map((res: any) =>
          res.lines?.map((line: any) => line.text).join('\n')
        )
        .join('\n\n');
    }

    if (result.text) {
      return result.text;
    }

    const extractText = (obj: any): string[] => {
      let texts: string[] = [];

      if (typeof obj !== 'object' || obj === null) {
        return texts;
      }

      if (obj.text && typeof obj.text === 'string') {
        texts.push(obj.text);
      }

      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          texts = texts.concat(extractText(obj[key]));
        }
      }

      return texts;
    };

    const texts = extractText(result);
    if (texts.length > 0) {
      return texts.join('\n');
    }

    console.error('Unknown OCR response format:', result);
    return 'Could not parse OCR result. See console for details.';
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('Please upload an image.');
      return;
    }
    setLoading(true);
    setError('');
    setOcrResult('');

    try {
      const result = await getOCRText(image);
      console.log('Raw OCR response:', result);

      if (result) {
        const extractedText = parseOCRResponse(result);
        setOcrResult(extractedText || 'No text found in the image.');
      } else {
        setOcrResult('No result returned from OCR service.');
      }
    } catch (error) {
      console.error('Error during OCR:', error);
      setError('An error occurred while processing the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-purple-400 to-pink-400 p-8">
      <div className="max-w-2xl w-full mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Image to Text Converter</h1>

        <div className="flex gap-4 justify-center mb-8">
          <label className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-lg hover:from-purple-600 hover:to-pink-500 transition-all shadow-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            Upload Image
          </label>
        </div>

        {/* Image preview */}
        {imagePreview && (
          <div className="mb-6">
            <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-2 rounded-lg mt-4 hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Extract Text'}
        </button>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        {ocrResult && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-indigo-700">OCR Result:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg mt-2 text-sm text-gray-700">{ocrResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCRApp;
