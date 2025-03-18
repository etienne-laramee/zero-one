# app.py
from flask import Flask, request

app = Flask(__name__)

def addition(a, b):
	return int(a)+int(b)

@app.route('/')
def hello():
	return "Bonjour mate!"

@app.route('/expected-values')
def expectedValues():
	return "Expected values: 123"

@app.route('/addition')
def add():
	a = request.args.get('a')
	b = request.args.get('b')
	sum = addition(a, b)
	message = f"The sum of {a} + {b} is {sum}!"
	return message

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
