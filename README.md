# 👁️ Roboflow Smart Assets

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Roboflow](https://img.shields.io/badge/Roboflow-6706ce?style=for-the-badge&logo=roboflow&logoColor=white)](https://roboflow.com/)

> An AI-powered image management dashboard that transforms raw assets into searchable, categorized data using Roboflow's Inference API.

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

```

### Challenges Overcome

* **Base64 Handling**: Efficiently converting browser-side images to the specific format required by the inference server.
* **State Management**: Handling asynchronous AI responses while maintaining a fluid, reactive UI.

## 📦 Getting Started

### Prerequisites

* Node.js (v24+)
* A Roboflow Private API Key

### Installation

1. **Clone the repository (SSH)**
```bash
git clone git@github.com:YOUR_USERNAME/roboflow-smart-assets.git
cd roboflow-smart-assets

```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps

```

3. **Configure Environment**
Create a `.env` file in the root directory:
```env
VITE_ROBOFLOW_API_KEY=your_key_here

```

4. **Run Development Server**
```bash
npm run dev

```

## 🧠 Why I Built This?

In Roboflow’s mission to "make the world programmable," the bridge between raw visual data and actionable software is the most critical component. I built this to demonstrate how a **Passionate Builder** can integrate SOTA (State-Of-The-Art) computer vision into a production-ready interface in a matter of hours.

---

Built with ⚡ by Oiertxo