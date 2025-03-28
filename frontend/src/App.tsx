import React, { useState } from 'react';
import { CombinationFormula } from './components/combinations/Combinations';
import { AnswerPane } from './components/answer/AnswerPane';
import { FormulaTabs } from './components/tabs/FormulaTabs';
import { Formula, FormulaResponse } from './components/types/Types';
import { formulaService } from './components/services/Services';
import { INPUT_N, INPUT_R } from './components/constants/InputFields';
import { FORMULA_TYPES } from './components/constants/Formulas';
import 'katex/dist/katex.min.css';


function App() {
  const [n, setN] = useState(0);
  const [r, setR] = useState(0);
  const [data, setData] = useState<FormulaResponse | null>(null);
  const [activeFormula, setActiveFormula] = useState<Formula>(FORMULA_TYPES.COMBINATION);

  async function handleFormulaChange(formula: Formula) {
    setActiveFormula(formula);
    try {
      let result = null;
      switch (formula) {
        case FORMULA_TYPES.COMBINATION:
          result = await formulaService.getCombination(n, r);
          break;
        case FORMULA_TYPES.PERMUTATION:
          result = await formulaService.getPermutation(n, r);
          break;
        case FORMULA_TYPES.FACTORIAL:
          result = await formulaService.getFactorial(n);
          break;
      }

      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value: inputValue } = e.target;
    const value = parseInt(inputValue) || 0;

    // Calculate new values first
    const newN = name === INPUT_N ? Math.max(0, value) : n;
    const newR = name === INPUT_R ? Math.min(value, newN) : Math.min(r, newN);

    // Update state
    setN(newN);
    setR(newR);

    try {
      const result = await formulaService.getCombination(newN, newR);
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-auto max-w-sm rounded-xl bg-white shadow-lg outline outline-black/5">
      <div className="p-4">
        <FormulaTabs activeFormula={activeFormula}
          onFormulaChange={handleFormulaChange}
        />
      </div>
      <CombinationFormula n={n} r={r} handleChange={handleChange} />
      <AnswerPane data={data} />
    </div>
  )
}

export default App
