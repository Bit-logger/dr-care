from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import base64
from typing import Dict, Optional
import os
from dotenv import load_dotenv

# Load environment variables (Looking for the secret .env file)
load_dotenv()

# --- CONFIGURATION ---
# SECURE CHANGE: We read the key from the environment, not the code.
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("WARNING: GROQ_API_KEY not found. App may crash if not set in .env")

client = Groq(api_key=GROQ_API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 🧠 THE BRAIN: IN-MEMORY PATIENT DATABASE ---
patient_db: Dict[str, dict] = {}

class SymptomRequest(BaseModel):
    user_name: str
    text: str

def get_patient_memory(user_name):
    if user_name not in patient_db:
        patient_db[user_name] = {"context": "", "history": []}
    return patient_db[user_name]

def encode_image(image_file):
    return base64.b64encode(image_file).decode('utf-8')

@app.get("/")
def home():
    return {"message": "Dr.Care AI Brain (Llama 4 Vision) is Online"}

# --- ENDPOINT 1: TEXT ANALYSIS ---
@app.post("/symptoms/analyze")
def analyze_symptoms(request: SymptomRequest):
    memory = get_patient_memory(request.user_name)
    past_info = memory["context"]
    
    system_prompt = f"""
    You are Dr.Care, an advanced AI Medical Assistant.
    
    PATIENT MEDICAL CONTEXT:
    {past_info if past_info else "No previous records available."}
    
    CURRENT USER QUESTION:
    {request.text}
    
    INSTRUCTIONS:
    1. Use Patient Context (X-Rays, history) if relevant.
    2. Format with **Bold Headings** and bullet points.
    3. Be concise and professional.
    """

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.text}
            ],
            model="llama-3.3-70b-versatile", 
        )
        
        bot_reply = chat_completion.choices[0].message.content
        memory["history"].append(f"User: {request.text} | Bot: {bot_reply}")
        
        if "diagnosis" in request.text.lower() or "medicine" in request.text.lower():
             memory["context"] += f"\n- Consultation Note: {request.text}\n"

        return {"diagnosis": bot_reply}
    except Exception as e:
        return {"diagnosis": f"Error: {str(e)}"}

# --- ENDPOINT 2: VISION ANALYSIS ---
@app.post("/vision/analyze")
async def analyze_image(user_name: str = Form(...), file: UploadFile = File(...)):
    memory = get_patient_memory(user_name)

    try:
        contents = await file.read()
        base64_image = encode_image(contents)

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Analyze this medical image. Identify findings, abnormalities, and suggest next steps. Provide a summary for medical records."},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}",
                            },
                        },
                    ],
                }
            ],
            model="meta-llama/llama-4-scout-17b-16e-instruct", 
        )
        
        analysis_text = chat_completion.choices[0].message.content
        
        # Save to memory so the Chat knows about it
        memory["context"] += f"\n[IMAGE ANALYSIS - {file.filename}]: {analysis_text}\n"
        
        return {"analysis": analysis_text}
    except Exception as e:
        return {"analysis": f"Error: {str(e)}"}