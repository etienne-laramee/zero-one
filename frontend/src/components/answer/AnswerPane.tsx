import { InlineMath } from 'react-katex';
import { FormulaResponse } from '../types/Types';

interface AnswerPaneProps {
  data: FormulaResponse | null;
}

export function AnswerPane({data}: AnswerPaneProps) {
  return (
    <div className="flex flex-col items-center justify-center pb-10">
      {data ? (
        <>
          <div className="text-gray-600">Result:</div>
          <div className="mb-4 text-2xl font-semibold">{data.result}</div>
          <div className="text-gray-600">Formula:</div>
          {data.formula && data.formula.map((line, index) => (
            <div key={index} className="mt-2"><InlineMath math={line} /></div>
          ))}
        </>
      ) : (
        <div className="text-gray-600">Enter values for n and r</div>
      )}
    </div>
  );
}