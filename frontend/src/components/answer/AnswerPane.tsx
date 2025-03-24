import { InlineMath } from 'react-katex';
import { CombinationResponse } from '../types/Types';

interface AnswerPaneProps {
  n: number;
  r: number;
  data: CombinationResponse | null;
}

export function AnswerPane({ n, r, data }: AnswerPaneProps) {
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