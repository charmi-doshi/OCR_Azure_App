// src/components/ActionButtons.tsx
import React from 'react';
import { Camera, Upload } from 'lucide-react';

interface ActionButtonsProps {
  showWebcam: boolean;
  setShowWebcam: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  processImage: (imageUrl: string) => Promise<void>;
  disabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  showWebcam, 
  setShowWebcam, 
  setSelectedImage, 
  processImage, 
  disabled = false 
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setSelectedImage(imageUrl);
        processImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex gap-4 justify-center mb-8">
      <button
        onClick={() => setShowWebcam(prev => !prev)}
        className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg transition-all shadow-lg ${
          disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:from-blue-600 hover:to-cyan-500 hover:shadow-xl'
        }`}
        disabled={disabled}
      >
        <Camera size={20} />
        {showWebcam ? 'Hide Camera' : 'Use Camera'}
      </button>
      
      <label className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-lg transition-all shadow-lg ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:from-purple-600 hover:to-pink-500 hover:shadow-xl cursor-pointer'
      }`}>
        <Upload size={20} />
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          disabled={disabled}
        />
      </label>
    </div>
  );
};

export default ActionButtons;