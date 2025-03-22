import axios from 'axios';

interface OCRResponse {
  recognitionResults: {
    lines: {
      text: string;
    }[];
  }[];
}

const endpoint = import.meta.env.VITE_AZURE_ENDPOINT; // Correct Azure endpoint
const apiKey = import.meta.env.VITE_AZURE_API_KEY;    // Correct Azure API key
console.log(endpoint)
export const getOCRText = async (imageFile: File): Promise<OCRResponse | null> => {
  // Correct URL format

  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await axios.post<OCRResponse>(endpoint, formData, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'multipart/form-data',
      },
    });
 
    return response.data;
  } catch (error) {
    console.error('Error during OCR:', error);
    return null;
  }
};
