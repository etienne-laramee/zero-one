import React, { useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './App.css';


const INPUT_N = "inputN";
const INPUT_R = "inputR";
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT);

interface CombinationResponse {
  combination: number;
  formula: string;
}

function CombinationPane({ n, r, handleChange }: { n: number, r: number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <CombinationFormula n={n} r={r} handleChange={handleChange}/>
    </div>
  );
}

function CombinationFormula({ n, r, handleChange }: { n: number, r: number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <CombinationN n={n} handleChange={handleChange} />
      C
      <CombinationR n={n}  r={r} handleChange={handleChange} />
    </div>
  );
}

function CombinationN({ n, handleChange }: {n: number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <input min="0" name={INPUT_N} type="number" value={n} onChange={handleChange} />
  );
}

function CombinationR({ n, r, handleChange }: {n:number, r: number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <input min="0" max={n} name={INPUT_R} type="number" value={r} onChange={handleChange} />
  );
}

function AnswerPane({ n, r, data }: { n: number, r: number, data: CombinationResponse | null }) {
  return (
    <div>
      {data ? (
        <>
          <div>Result: {data.combination}</div>
          <div>Formula: <InlineMath math={`_{${n}}C_{${r}} = \\frac{${n}!}{${r}!(${n}-${r})!}`} /></div>
        </>
      ): (
          <div>Enter values for n and r</div>
      )}
    </div>
  );
}

function App() {
  const [n, setN] = useState(0);
  const [r, setR] = useState(0);
  const [data, setData] = useState<CombinationResponse | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, valueAsNumber: value } = e.target;
    let newN = n;
    let newR = r;

    if (name == INPUT_N) {
      const newN = Math.max(0, value);
      setN(newN);
      setR(prev => Math.min(prev, newN));
    } else if (name == INPUT_R) {
      newR = value > newN? newN : value;
      setR(newR);
    }

    const xhr = new XMLHttpRequest();
    const params = ("n=" + newN + "&r=" + newR);
    xhr.open('GET', BACKEND_URL + "/combination?" + params);
    xhr.onload = function() {
      console.log('Response status:', xhr.status);
      console.log('Response text:', xhr.responseText);

      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setData(response);
      }
    }

    xhr.send();
  }

  return (
    <>
      <CombinationPane n={n} r={r} handleChange={handleChange} />
      <AnswerPane n={n} r={r} data={data} />
    </>
  )
}

export default App
