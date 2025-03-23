# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def factorial(n):
	if n > 0:
		total = factorial(n-1) * n
	else:
		total = 1
	return total

@app.get('/factorial')
def fact():
	n = int(request.args.get('n'))
	_factorial = factorial(n)
	return 'factorial {} = {}'.format(n, _factorial)

@app.get('/combination')
def combination():
	n = int(request.args.get('n'))
	r = int(request.args.get('r'))
	_combination = factorial(n)//(factorial(r)*factorial(n-r))
	app.logger.info("Combination calculated: %d", _combination)
	return jsonify(combination=_combination, formula="formula")

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
