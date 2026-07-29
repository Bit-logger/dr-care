# Dr. Care - Advanced AI Medical Assistant

## 🚀 Project Overview

**Dr. Care** is a next-generation AI-powered medical assistant designed to provide intelligent preliminary diagnoses, analyze medical symptoms, process medical images (like X-Rays), and generate professional medical reports. It leverages state-of-the-art Large Language Models (LLMs) and Vision Models to offer an interactive, accessible, and highly visual healthcare experience. 

The platform features an innovative **Interactive 3D Body Map**, allowing users to visually select areas of pain or discomfort, which are then analyzed by the AI. Furthermore, it incorporates voice interaction (Speech-to-Text and Text-to-Speech) to make the consultation process natural and accessible.

---

## 🎯 The Problem It Solves

Accessing immediate preliminary medical advice can be challenging. Patients often struggle to accurately describe their symptoms or understand complex medical jargon. Moreover, tracking medical history and analyzing reports requires professional assistance, which may not always be immediately available.

**Dr. Care solves these problems by:**
1.  **Lowering the barrier to entry:** Users can interact via voice or an intuitive 3D body map.
2.  **Providing instant AI analysis:** Quick interpretation of symptoms and medical images.
3.  **Generating structured, professional reports:** Creating PDF summaries of consultations that can be shared with human doctors.
4.  **Maintaining Context:** The AI remembers the patient's history during the session for coherent and contextual advice.

### Target Audience
*   **Individuals** seeking immediate, preliminary insights into their symptoms before visiting a clinic.
*   **Elderly or Visually Impaired Users** who benefit from Voice UI capabilities.
*   **Clinics & Telehealth Services** looking to integrate an AI triage system to gather structured patient data before consultations.

*(Disclaimer: Dr. Care is an AI assistant and is NOT a substitute for professional medical advice, diagnosis, or treatment.)*

---

## ✨ Key Features

1.  **Interactive 3D Body Map (Three.js):** 
    *   Users can click on a 3D human model to report pain or numbness in specific body parts.
    *   Smart detection maps 3D coordinates to specific anatomical regions (Head, Chest, Arms, Legs, etc.).
2.  **Advanced AI Diagnosis (Llama 3.3 70B):**
    *   Analyzes text-based symptom descriptions.
    *   Maintains an in-memory patient context for continuous, coherent conversations.
3.  **Medical Vision Analysis (Llama 4 Vision):**
    *   Users can upload medical images (X-rays, scans).
    *   The AI identifies findings, abnormalities, and suggests next steps.
4.  **Accessible Voice UI:**
    *   Integrated Speech-to-Text allows users to dictate symptoms.
    *   Text-to-Speech reads the AI's diagnosis aloud.
5.  **Professional PDF Reports (jsPDF):**
    *   Generates comprehensive, downloadable medical reports containing patient details, symptoms, and the AI's analysis.
6.  **Patient Session Management:**
    *   Collects patient vitals (Name, Age, Weight, Height, Blood Group) before starting a session.
    *   Maintains a history of past consultations stored locally.

---

## 🛠️ Technical Architecture & Tech Stack

The project follows a modern decoupled architecture:

### Frontend (User Interface)
*   **Framework:** React 19 + Vite
*   **Styling:** Tailwind CSS + Lucide React (Icons)
*   **3D Rendering:** Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
*   **Voice Integration:** Web Speech API (Custom `useVoice` hook)
*   **PDF Generation:** `jspdf`

### Backend (API & AI Logic)
*   **Framework:** FastAPI (Python)
*   **AI Integration:** Groq API
*   **Models Used:**
    *   Text Processing: `llama-3.3-70b-versatile`
    *   Vision Processing: `meta-llama/llama-4-scout-17b-16e-instruct`
*   **Data Handling:** Pydantic (Validation), Base64 (Image encoding)
*   **Session State:** In-memory dictionary mapped to user names.

---

## 📂 Project Structure

```
.
├── backend/
│   ├── main.py              # FastAPI application & Groq API endpoints
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # (Not in repo) Contains GROQ_API_KEY
├── frontend/
│   ├── public/
│   │   └── human_model.glb  # 3D model asset for the Body Map
│   ├── src/
│   │   ├── components/
│   │   │   ├── BodyMap3D.jsx  # Three.js interactive component
│   │   │   └── LoginModal.jsx # Initial patient intake form
│   │   ├── hooks/
│   │   │   └── useVoice.js    # Custom hook for Speech Recognition & Synthesis
│   │   ├── App.jsx            # Main application logic and UI layout
│   │   ├── ReportService.js   # PDF generation and local storage logic
│   │   ├── firstAidData.jsx   # (Optional) Hardcoded first aid data
│   │   └── main.jsx           # React entry point
│   ├── package.json         # Node.js dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── vite.config.js       # Vite bundler configuration
└── README.md                # Project documentation
```

---

## 🚀 Installation & Setup Guide

### Prerequisites
*   Node.js (v18+ recommended)
*   Python (3.9+ recommended)
*   A Groq API Key (from console.groq.com/keys)

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment (optional but recommended):
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Configure the Environment Variable:
    *   Create a file named `.env` in the `backend/` directory.
    *   Add your Groq API key:
        ```env
        GROQ_API_KEY=your_groq_api_key_here
        ```
5.  Start the FastAPI server:
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    *The backend will be available at http://localhost:8000*

### 2. Frontend Setup

1.  Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev &
    ```
    *The frontend will typically be available at http://localhost:5173*

---

## 💼 Professional Aspects & Problem Solving

*   **Security & Privacy:** The application collects patient details (weight, height, age) and passes them to the AI to provide context-aware responses. The backend uses an in-memory dictionary for active sessions, avoiding persistent database storage of sensitive medical queries in this demonstration architecture. The API key is securely loaded via `.env` files rather than hardcoded.
*   **Error Handling (Voice API):** The custom `useVoice` hook includes robust error handling for common Web Speech API issues, gracefully alerting users if they lack network connectivity or if microphone permissions are blocked.
*   **Intuitive UX Mapping (3D):** The `BodyMap3D` component solves the complex problem of mapping 3D coordinates (x, y, z) from a user's click to semantic anatomical zones (e.g., "Left Arm", "Head") using spatial heuristics, making the UI incredibly intuitive.
*   **Structured Outputs:** The PDF generation (`ReportService.js`) takes unstructured AI output and formats it into a clean, professional medical report layout suitable for sharing with healthcare providers.

## 📝 License
This project is for educational and demonstrative purposes.
