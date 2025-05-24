from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import json
import logging
import traceback
from openai import OpenAI
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from pathlib import Path

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Get the absolute path to the backend directory
BACKEND_DIR = Path(__file__).parent.absolute()

app = Flask(__name__)

# Configure CORS properly
CORS(app, 
     resources={r"/api/*": {"origins": ["http://localhost:3003"]}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "OPTIONS"])

# Initialize DeepSeek client
client = OpenAI(
    api_key="sk-81abdc6d072c46be86f4b70d96310ba8",
    base_url="https://api.deepseek.com"
)

# System prompt for Somali restaurant assistant
SYSTEM_PROMPT = """
Waxaad tahay caawiyaha dalabka cuntada Soomaalida. Raac tilmaamahan:

1. Had iyo jeer ku jawaab Af-Soomaali
2. U isticmaal luuqad diiran oo dhaqanka Soomaalida waafaqsan
3. Ka caawi macaamiisha:
   - Doorashada cuntada
   - Dalabka
   - Su'aalaha ku saabsan qiimaha
   - Macluumaadka gaarsiinta
4. Weydii faahfaahin dheeraad ah marka loo baahdo
5. Xaqiiji dalabyada si cad
6. Ilaali sirta macmiilka

Waa inaad noqotaa mid:
- Soo dhaweyn badan
- Xirfad leh
- Caawin kara dalabyo kala duwan
- Muujin kara dhaqanka Soomaalida
"""

def preprocess_text(text):
    # Tokenize
    tokens = word_tokenize(text.lower())
    # Remove stopwords and lemmatize
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stopwords.words('english')]
    return ' '.join(tokens)

# Load the trained model
def load_model():
    try:
        model_path = BACKEND_DIR / 'models' / 'foodbot_model.pkl'
        logger.info(f"Attempting to load model from: {model_path}")
        
        if not model_path.exists():
            logger.error(f"Model file not found at {model_path}")
            return None
            
        model = joblib.load(model_path)
        logger.info("Model loaded successfully")
        return model
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        logger.error(traceback.format_exc())
        return None

# Load training data
def load_training_data():
    try:
        data_path = BACKEND_DIR / 'dataset' / 'training_data.json'
        logger.info(f"Attempting to load training data from: {data_path}")
        
        if not data_path.exists():
            logger.error(f"Training data file not found at {data_path}")
            return None
            
        with open(data_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        logger.info(f"Training data loaded successfully with {len(data)} entries")
        return data
    except Exception as e:
        logger.error(f"Error loading training data: {str(e)}")
        logger.error(traceback.format_exc())
        return None

# Initialize model and training data
model = load_model()
training_data = load_training_data()

def get_deepseek_response(message: str, context: str = "") -> str:
    try:
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Context: {context}\n\nUser message: {message}"}
        ]
        
        logger.info("Attempting to call DeepSeek API...")
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            temperature=0.7,
            stream=False
        )
        logger.info("Successfully received response from DeepSeek API")
        
        if not response or not response.choices:
            logger.error("Invalid response format from DeepSeek API")
            raise ValueError("Invalid response format from DeepSeek API")
            
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Error getting DeepSeek response: {str(e)}")
        logger.error(f"Error type: {type(e).__name__}")
        logger.error(f"Full error details: {traceback.format_exc()}")
        
        if "api_key" in str(e).lower():
            error_msg = "API key error - Please check DeepSeek API configuration"
        elif "connection" in str(e).lower():
            error_msg = "Connection error - Unable to reach DeepSeek API"
        else:
            error_msg = f"Unexpected error: {str(e)}"
            
        raise Exception(error_msg)

@app.route('/api/chatbot/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return '', 204
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Missing message in request'}), 400

        user_message = data['message']
        logger.info(f"Received message: {user_message}")

        try:
            final_response = get_deepseek_response(user_message)
            logger.info(f"Final response: {final_response}")
            
            return jsonify({
                'success': True,
                'response': final_response
            })
        except Exception as e:
            logger.error(f"Error processing message: {str(e)}")
            return jsonify({
                'success': False,
                'error': str(e)
            }), 500

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': 'Internal server error'
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 