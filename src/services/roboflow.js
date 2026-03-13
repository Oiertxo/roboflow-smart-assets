import axios from 'axios';

const API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY;
const MODEL_ID = "coco/3"; // Standard object detection model

/**
 * Service to handle image analysis using Roboflow's inference API.
 */
export const analyzeImage = async (base64Data) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/analyze", 
      data: {
        image: base64Data
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error analyzing image via Proxy:", error.response?.data || error.message);
    throw error;
  }
};

// Mock service to test the UI without an API Key
export const analyzeImageMock = async (base64Data) => {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return fake data
  return {
    predictions: [
      { class: "person", confidence: 0.95 },
      { class: "laptop", confidence: 0.88 },
      { class: "coffee-cup", confidence: 0.72 }
    ]
  };
};