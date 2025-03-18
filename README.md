# Python and Math learning project
# Usage
## Dev
docker compose up --build --force-recreate

# Roadmap
## 🎯 Recommended Tech Stack:
|Component|	Recommendation|	Why this choice?|
|--|--|--|
|Backend API|✅ Python + Flask|Simple, fast, easy to learn.|
|Frontend|✅ React + Vite|Lightweight, fast, easy to integrate with Flask|
|API Requests|✅ Axios (JavaScript)|Easy HTTP requests to Flask API|
|Containerization|✅ Docker & Docker Compose|For reproducible and easy deployments|
|Math Library|✅ Python built-ins + SymPy|Powerful discrete math & symbolic computation|
|Database (optional)|✅ SQLite or none at first|Simple, file-based database (only if needed)|

## 📂 Project Structure:
A clear, modular layout helps maintain focus and structure:

```sh
discrete-math-app/
├── backend/
│   ├── api/
│   │   ├── chapter1.py
│   │   └── chapter2.py
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── README.md
└── .gitignore
```

## 🚀 Example Use Case: "Permutations & Combinations" API
Let's briefly illustrate with an API for discrete math (chapter: counting):

✅ Backend (Flask API example)
**File**: backend/api/chapter1.py

```python
from math import factorial as fact

def permutations(n, r):
    return fact(n) // fact(n - r)

def combinations(n, r):
    return fact(n) // (fact(r) * fact(n - r))
```
**File**: backend/app.py

```python
from flask import Flask, request, jsonify
from api.chapter1 import permutations, combinations

app = Flask(__name__)

@app.route('/api/chapter1/permutations')
def api_permutations():
    n = int(request.args.get('n'))
    r = int(request.args.get('r'))
    result = permutations(n, r)
    return jsonify({'n': n, 'r': r, 'permutations': result})

@app.route('/api/chapter1/combinations')
def api_combinations():
    n = int(request.args.get('n'))
    r = int(request.args.get('r'))
    result = combinations(n, r)
    return jsonify({'n': n, 'r': r, 'combinations': result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
```

## ✅ Frontend (React with Axios)
React frontend to interact with the API:

Install React + Axios (via Vite):

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios
```
**File**: frontend/src/App.jsx

```jsx
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const [permutations, setPermutations] = useState(null);
  const [combinations, setCombinations] = useState(null);

  const calculate = async () => {
    const permRes = await axios.get(`/api/chapter1/permutations?n=${n}&r=${r}`);
    const combRes = await axios.get(`/api/chapter1/combinations?n=${n}&r=${r}`);
    setPermutations(permRes.data.permutations);
    setCombinations(combRes.data.combinations);
  };

  return (
    <div>
      <h1>Permutations & Combinations</h1>
      <input type="number" value={n} onChange={e => setN(e.target.value)} placeholder="n" />
      <input type="number" value={r} onChange={e => setR(e.target.value)} placeholder="r" />
      <button onClick={calculate}>Calculate</button>

      {permutations !== null && (
        <div>
          <p>Permutations (P({n},{r})) = {permutations}</p>
          <p>Combinations (C({n},{r})) = {combinations}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```
## 🐳 Docker & Docker Compose Setup
To simplify your workflow, use Docker Compose:

**File**: docker-compose.yml

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
    depends_on:
      - backend
```
**File**: backend/Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```
**File**: frontend/Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

## 🚩 Recommended Development Workflow:
- Develop backend API endpoints for each discrete math chapter you study.
- Extend the frontend to consume the API interactively.
- Use Docker Compose (docker compose up) to instantly run the full-stack locally.

## 🔥 Optional Enhancements Later:
- Add unit/integration tests (pytest for Python, vitest or Jest for React).
- Implement more advanced math concepts using libraries like SymPy.
- Add visualizations with libraries like Chart.js, Recharts, or Plotly.

## 🎯 Why this Stack is Ideal for your Learning:
- Clear separation: backend API for discrete math logic, React frontend for easy interaction.
- Rapid development: Flask and React allow quick prototyping.
- Easy to Dockerize: Immediate and consistent deployments across environments.
- Real-world relevance: Learn discrete math and software engineering simultaneously.

This clear, structured, yet flexible tech stack will help you apply and solidify discrete math concepts, master Python and Flask, and gain real-world experience with Docker and React.