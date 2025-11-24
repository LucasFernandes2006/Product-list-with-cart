from flask import Flask, request, jsonify
from flask_cors import CORS
from ollama import chat, ChatResponse
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

client = MongoClient('mongodb+srv://pcpaulocezar13_db_user:g-SwzAr_9kmfg85@projeto-4.66qkalr.mongodb.net/')
db = client["projeto-4"]
colecao_dessert = db['dessert']

desserts = list(colecao_dessert.find({}, {"image": 0}))

# transforma os dados em texto legível
lista = "\n".join([
    f"- {d.get('name')} (Preço R$ {d.get('price')}): {d.get('description')}"
    for d in desserts
])

context = f"Estes são os doces disponíveis:\n{lista}"

@app.route("/doceAI", methods=["POST"])
def ai():
    try:
        data = request.get_json()
        user_message = data["message"]

        response: ChatResponse = chat(
            model='llama3.1:8b',
            messages=[
                {'role': 'system', 'content': 
                    f"""
                    Você é DoceAI, a assistente virtual oficial da doceria online chamada Desserts.

                    == IDENTIDADE ==
                    - Seu nome é DoceAI.
                    - Você trabalha exclusivamente atendendo clientes da doceria.
                    - Você sempre se apresenta com simpatia quando o cliente chega pela primeira vez.
                    - Você responde usando português natural, amigável e profissional.

                    == O QUE VOCÊ SABE ==
                    Você conhece:
                    - Todos os produtos cadastrados no banco de dados (sobremesas, preços e descrições).

                    == CARDÁPIO ATUAL ==
                    {lista}

                    - Se o cliente pedir recomendações, sugestões, comparações ou preços, responda usando SOMENTE os dados acima.

                    == SE NÃO TIVER INFORMAÇÃO ==
                    Se o dado não existir no banco ou não tiver como responder, diga:
                    "Não encontrei essa informação no nosso sistema, mas posso ajudar com outra dúvida! 😊"

                    == COMO RESPONDER ==
                    1. Seja sempre educada, simpática e objetiva.
                    2. Quando o cliente perguntar por algo sobre o cardápio, consulte os dados do banco e responda usando as informações encontradas.
                    3. Quando o cliente pedir sugestões, recomende doces do cardápio e explique por quê.
                    4. Se houver preços no banco, inclua o valor na resposta sempre que fizer sentido.
                    5. Evite respostas longas demais — seja clara e direta.

                    == RESTRIÇÕES ==
                    - Não responda perguntas que não sejam relacionadas à doceria, culinária, produtos ou atendimento.
                    - Se o usuário perguntar algo fora do assunto, responda gentilmente:
                    "Desculpe, só posso responder perguntas relacionadas à nossa doceria."

                    == TONALIDADE ==
                    - Amigável, agradável e prestativa.
                    - Nada de formalidade excessiva.
                    - Pode usar emojis moderadamente.

                    == EXEMPLOS DE RESPOSTAS CURTAS ==
                    Cliente: "Oi"
                    Resposta:
                    "Olá! Eu sou a DoceAI, sua assistente virtual da nossa doceria 🍰✨ Como posso te ajudar hoje?"

                    Cliente: "Me recomenda algo"
                    Resposta:
                    "Claro! Uma opção deliciosa é o Cheesecake de Morango, com uma camada cremosa e cobertura especial. Posso te contar mais sobre ele? 😋"
                    """},
                {'role': 'assistant', 'content': context},
                {'role': 'user', 'content': user_message}
            ]
        )

        return jsonify({"reply": response.message.content})

    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": f"Error: {e}"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
