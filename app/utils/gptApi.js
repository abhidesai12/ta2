import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  timeout: 60000,
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for retries
api.interceptors.response.use(null, async error => {
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    console.log('Request timed out, retrying...');
    const config = error.config;
    try {
      return await api.request(config);
    } catch (retryError) {
      return Promise.reject(retryError);
    }
  }
  return Promise.reject(error);
});

const getFileType = (file) => {
  if (file.mimeType) return file.mimeType;
  if (file.type) return file.type;
  
  const extension = file.uri.split('.').pop().toLowerCase();
  const mimeTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain'
  };
  
  return mimeTypes[extension] || 'application/octet-stream';
};

const compressImage = async (uri, onProgress) => {
  try {
    onProgress?.('Compressing image...');
    console.log('Starting image compression');

    // First try with moderate compression
    let compressed = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );

    // Get base64
    let base64 = await FileSystem.readAsStringAsync(compressed.uri, {
      encoding: FileSystem.EncodingType.Base64
    });

    // If still too large, compress more aggressively
    if (base64.length > 1000000) { // If larger than ~1MB
      onProgress?.('Image still large, applying additional compression...');
      compressed = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 600 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      base64 = await FileSystem.readAsStringAsync(compressed.uri, {
        encoding: FileSystem.EncodingType.Base64
      });
    }

    console.log('Compressed image size:', Math.round(base64.length / 1024), 'KB');
    return base64;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

export const generateFeedback = async (file, student, assignment, onProgress) => {
  try {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "hello"
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    };

    onProgress?.('Sending request to Chat API...');
    console.log('Making Chat API request...');
    const response = await api.post('/chat/completions', payload);
    console.log('Chat API response received');
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
};
