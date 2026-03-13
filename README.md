# 👁️ Roboflow Smart Assets

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?style=for-the-badge)](https://roboflow-smart-assets.pages.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

> An AI-powered image management dashboard that transforms raw assets into searchable, categorized data using a secure Serverless Proxy and Roboflow's Inference API.

## 🔗 [Live Demo: roboflow-smart-assets.pages.dev](https://roboflow-smart-assets.pages.dev/)

## 🚀 Overview

**Smart Assets** is a high-performance digital asset manager (DAM) that showcases the integration of Computer Vision into modern web workflows. Beyond simple tagging, this tool implements a **Full-stack Serverless Architecture** to provide secure, low-latency AI inference and instant semantic filtering.

## ✨ Key Features

- **Automated AI Tagging**: Instantly identifies 80+ object classes using the COCO model.
- **Secure Serverless Proxy**: API keys are never exposed to the client; all inference calls are routed through Cloudflare Functions.
- **Semantic Filtering**: Real-time library filtering based on AI-generated tags.
- **Edge Deployment**: Hosted on Cloudflare Pages for global low-latency and resilience against ISP/CDN blockages.
- **Modern Stack**: Engineered with **Vite 8**, **React**, and **Tailwind CSS v4**.

## 🛠️ Technical Architecture

### Security-First Implementation (BFF Pattern)
To follow industry best practices, the application uses a **Backend-for-Frontend (BFF)** pattern. Instead of exposing the Private API Key in the browser, the frontend communicates with a secure Cloudflare Worker.