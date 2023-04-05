from flask import Flask, render_template, request, jsonify
from transformers import pipeline,AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)

model_name = "deepset/roberta-base-squad2"
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)

tokenizer = AutoTokenizer.from_pretrained("valhalla/t5-base-e2e-qg")
model = AutoModelForSeq2SeqLM.from_pretrained("valhalla/t5-base-e2e-qg")
text2text_generator = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

@app.route('/')
def menu():
    return render_template('open.html')

@app.route('/answering')
def answering():
    return render_template('answering.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/qgen')
def qgen():
    return render_template('question.html')

@app.route('/questions', methods=['POST'])
def questions():
    text = request.form['text']
    question = text2text_generator(text, max_length=64, do_sample=False)
    return jsonify(str(question[0]['generated_text']))

@app.route('/answer', methods=['POST'])
def answer():
    text = request.form['text']
    question = request.form['question']
    question_set = {'question': question, 'context': text}
    result = nlp(question_set)
    return jsonify({'answer': result['answer']})

@app.route('/save', methods=['POST'])
def save():
    filename = request.form['filename']
    content = f"Question: {request.form['question']}\nAnswer: {request.form['answer']}"
    with open(f"{filename}.txt", "w") as f:
        f.write(content)
    return "File saved successfully!"

if __name__ == '__main__':
    app.run(debug=True)