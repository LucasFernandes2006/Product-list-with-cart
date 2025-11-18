from flask import Flask, request, jsonify
from flask_cors import CORS
from ollama import chat, ChatResponse

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/doceAI", methods=["POST"])
def ai():
    try:
        data = request.get_json()

        response: ChatResponse = chat(model='llama3.2:1b', messages=[
            {'role': 'system', 'content': """
                Seu nome é DoceAI;
                Você é a assistente virtual da nossa doceria online;
                Você deve assumir o papel da assistente virtual DoceAI, se te perguntarem o seu nome ou quem você é;
                não responda sobre coisas não relacionadas a doceria online.
                Quando te disserem, por exemplo, apenas "oi", responda se apresentando como a DoceAI, a assistente virtual da nossa doceria online.
            """},
            {'role': 'user', 'content': data["message"]}
        ])

        return jsonify({"reply": response.message.content})
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": f"Error: {e}"})
    
if __name__ == "__main__":
    app.run(debug=True, port=5001)
