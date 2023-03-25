from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
from flask import Flask, render_template, request, jsonify

app1 = Flask(__name__)

tokenizer = AutoTokenizer.from_pretrained("valhalla/t5-base-e2e-qg")
model = AutoModelForSeq2SeqLM.from_pretrained("valhalla/t5-base-e2e-qg")
text2text_generator = pipeline("text2text-generation", model=model, tokenizer=tokenizer)


@app1.route('/')
def home():
    return render_template('index.html')


@app1.route('/questions', methods=['POST'])
def questions():
    text = request.form['text']
    question = text2text_generator(text, max_length=64, do_sample=False)
    return jsonify(str(question[0]['generated_text']))


if __name__ == '__main__':
    app1.run(debug=True)

