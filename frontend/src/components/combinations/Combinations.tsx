import React from 'react';
import { InlineMath } from 'react-katex';
import { INPUT_N, INPUT_R } from '../constants/InputFields';

interface InputProps {
  n: number;
  r: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CombinationInput({ value, onChange, min, max, name }: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  name: string;
}) {
  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={() => {
          const event = {
            target: {
              name,
              value: String(Math.min(value + 1, max)),
              valueAsNumber: Math.min(value + 1, max)
            }
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
        }}
        className="absolute -top-6 text-gray-500 hover:text-gray-700"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3l9 9H3z" />
        </svg>
      </button>
      <input
        className="w-16 rounded-lg border px-2 py-1 text-center
          [appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        min={min}
        max={max}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={(e) => e.target.select()}
      />
      <button
        onClick={() => {
          const event = {
            target: {
              name,
              value: String(Math.max(value - 1, min)),
              valueAsNumber: Math.max(value - 1, min)
            }
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
        }}
        className="absolute -bottom-6 text-gray-500 hover:text-gray-700"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21l9-9H3z" />
        </svg>
      </button>
    </div>
  );
}

export function CombinationN({ n, handleChange }: Omit<InputProps, 'r'>) {
  return (
    <CombinationInput
      value={n}
      onChange={handleChange}
      min={0}
      max={1000}
      name={INPUT_N}
    />
  );
}

export function CombinationR({ n, r, handleChange }: InputProps) {
  return (
    <CombinationInput
      value={r}
      onChange={handleChange}
      min={0}
      max={n}
      name={INPUT_R}
    />
  );
}

export function CombinationFormula({ n, r, handleChange }: InputProps) {
  return (
    <div className="flex items-end justify-center gap-2 p-20">
        <span className="text-2xl font-semibold text-gray-500"><InlineMath math={`n`} /></span>
      <div className="relative">
        <CombinationN n={n} handleChange={handleChange} />
      </div>
      <span className="text-8xl font-semibold text-gray-500"><InlineMath math={`C`} /></span>
        <span className="text-2xl font-semibold text-gray-500"><InlineMath math={`r`} /></span>
      <div className="relative">
        <CombinationR n={n} r={r} handleChange={handleChange} />
      </div>
    </div>
  );
}