from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai
import re

app = Flask(__name__)
CORS(app)  # <- This enables CORS

genai.configure(api_key="AIzaSyB3waCyrFLd4uGNT_cTsYBhhclVaHvfPn0")  # Replace with your real key

generation_config = {
    "temperature": 2,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 500,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction=(
        "You are a cybersecurity awareness assistant working as part of the JuCC awareness team. "
        "Your role is to answer awareness questions in cybersecurity based on trusted global standards "
        "such as those from CISA and NCSC just answer from them. Always give answers that are short, simple, and easy to understand, "
        "avoiding technical jargon. Mention CISA or NCSC as the source when relevant."
    ),
)

chat_sessions = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_id = data.get("user_id", "default")
    user_input = data.get("message", "")

    if user_id not in chat_sessions:
        chat_sessions[user_id] = model.start_chat(history=[])

    session = chat_sessions[user_id]
    response = session.send_message(user_input)

    response_text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', response.text)
    response_text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', response_text)
    response_text = re.sub(r'^\* (.*?)$', r'<ul><li>\1</li></ul>', response_text, flags=re.MULTILINE)
    response_text = response_text.replace('\n', '<br>')

    answer = response_text.strip() + "<br><br>🔎 Advice based on CISA and NCSC guidelines."
    return jsonify({"response": answer})

if __name__ == '__main__':
    app.run(debug=True)
