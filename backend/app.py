# app.py
from flask import Flask, request

app = Flask(__name__)

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
def expectedValues():
	n = int(request.args.get('n'))
	r = int(request.args.get('r'))
	print('n {}, r {}'.format(n, r))
	combination = factorial(n)//(factorial(r)*factorial(n-r))
	return "Combination {}, {} = {}".format(n, r, combination)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
