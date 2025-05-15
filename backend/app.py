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
    app.logger.info("Factorial calculated: %d", _factorial)
    return jsonify(result=_factorial, formula=[
        f"{n}!={_factorial}",
    ])

@app.get('/combination')
def combination():
    n = int(request.args.get('n'))
    r = int(request.args.get('r'))
    _combination = factorial(n)//(factorial(r)*factorial(n-r))
    app.logger.info("Combination calculated: %d", _combination)
    return jsonify(result=_combination, formula=[
        f"_{{{n}}}C_{{{r}}} = \\frac{{{n}!}}{{{r}!({n}-{r})!}}",
        f"_{{{n}}}C_{{{r}}} = \\frac{{{factorial(n)}}}{{{factorial(r)}\\times{factorial(n-r)}}}",
        f"_{{{n}}}C_{{{r}}} = \\frac{{{factorial(n)}}}{{{factorial(r) * factorial(n-r)}}}",
        f"_{{{n}}}C_{{{r}}} = {_combination}"])

@app.get('/permutation')
def permutation():
    n = int(request.args.get('n'))
    r = int(request.args.get('r'))
    _permutation = factorial(n)//factorial(n-r)
    app.logger.info("Permutation calculated: %d", _permutation)
    return jsonify(result=_permutation, formula=[
        f"_{{{n}}}P_{{{r}}} = \\frac{{{n}!}}{{({n}-{r})!}}",
        f"_{{{n}}}P_{{{r}}} = \\frac{{{n}!}}{{{n-r}!}}",
        f"_{{{n}}}P_{{{r}}} = \\frac{{{factorial(n)}}}{{{factorial(n-r)}}}",
        f"_{{{n}}}P_{{{r}}} = {_permutation}"])

@app.get('/amdahl')
def amdahl():
    p = float(request.args.get('p'))
    s = float(request.args.get('s'))

    # TODO Handle division by 0

    _maximumPossibleImprovement = (1 / ((1 - p) + (p / s)))
    app.logger.info("Amdahl's law calculated: S(max)=%d", _maximumPossibleImprovement)
    return jsonify(
        result=_maximumPossibleImprovement,
        formula=[
            f"S_{{max}}=\\frac{{1}}{{(1 - {p}) + \\frac{{{p}}}{{{s}}}}}",
            f"S_{{max}}=\\frac{{1}}{{{1-p}+{p/s}}}",
            f"S_{{max}}=\\frac{{1}}{{{(1-p)+(p/s)}}}",
            f"S_{{max}}={1/((1-p)+(p/s))}"
        ])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)