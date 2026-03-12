# 👁️ Roboflow Smart Assets

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Roboflow](https://img.shields.io/badge/Roboflow-6706ce?style=for-the-badge&logo=roboflow&logoColor=white)](https://roboflow.com/)

> **The "Be so good they can't ignore you" Project.** An AI-powered image management dashboard that transforms raw assets into searchable, categorized data using Roboflow's Inference API.

## 🚀 Overview

**Smart Assets** is a high-performance frontend proof-of-concept designed to showcase the power of integrating Computer Vision into everyday workflows. Instead of manual tagging, this tool uses the **Roboflow Inference SDK** to automatically identify objects, calculate confidence scores, and provide instant semantic filtering.

## ✨ Key Features

- **Automated AI Tagging**: Instantly identifies 80+ object classes using the COCO model.
- **Zero-Latency Filtering**: Filter through your library by typing object names (e.g., "laptop", "person").
- **Metadata Inspection**: Deep-dive into detection details, including confidence percentages and technical resolution.
- **Modern Stack**: Built with **Vite 8**, **React**, and **Tailwind CSS v4** for extreme performance and a sleek developer experience.

## 🛠️ Technical Implementation

### Roboflow Integration
The core of the application leverages the `Inference API`. By using the hosted endpoint, the app achieves low-latency responses without the need for a local heavy-weight model.

```javascript
// Optimized inference call
const response = await axios({
  method: "POST",
  url: `https://outline.roboflow.com/${MODEL_ID}`,
  params: { api_key: API_KEY },
  data: base64Data
});