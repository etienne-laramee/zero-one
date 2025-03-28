import { InlineMath } from 'react-katex';
import { CombinationResponse } from '../types/Types';

interface AnswerPaneProps {
  n: number;
  r: number;
  data: CombinationResponse | null;
}

export function AnswerPane({ n, r, data }: AnswerPaneProps) {
  return (
    <div className="flex flex-col items-center justify-center pb-10">
      {data ? (
        <>
          <div className="text-gray-600">Result:</div><div id="result" className="">{data.combination}</div>
          <div className="text-gray-600">Formula:</div>
          <div id="formula"><InlineMath math={`_{${n}}C_{${r}} = \\frac{${n}!}{${r}!(${n}-${r})!}`} /></div>
        </>
      ): (
          <div className="text-gray-600">Enter values for n and r</div>
      )}
    </div>
  );
}