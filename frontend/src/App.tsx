import React, { useState } from 'react';
import { CombinationFormula } from './components/combinations/Combinations';
import { AnswerPane } from './components/answer/AnswerPane';
import { CombinationResponse } from './components/types/Types';
import { combinationService } from './components/services/Services';
import { INPUT_N, INPUT_R } from './components/constants/InputFields';
import 'katex/dist/katex.min.css';


function App() {
  const [n, setN] = useState(0);
  const [r, setR] = useState(0);
  const [data, setData] = useState<CombinationResponse | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value ? e.target.valueAsNumber : 0;
    let newN = n;
    let newR = r;

    if (name == INPUT_N) {
      const newN = Math.max(0, value);
      setN(newN);
      setR(prev => Math.min(prev, newN));
    } else if (name == INPUT_R) {
      newR = value > newN ? newN : value;
      setR(newR);
    }

    try {
      const result = await combinationService.getCombination(newN, newR);
      setData(result);
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div className="mx-auto max-w-sm rounded-xl bg-white shadow-lg outline outline-black/5">
      <CombinationFormula n={n} r={r} handleChange={handleChange} />
      <AnswerPane n={n} r={r} data={data} />
    </div>
  )
}

export default App
