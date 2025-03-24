import React from 'react';
import { INPUT_N, INPUT_R } from '../constants/InputFields';

interface InputProps {
    n: number;
    r: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CombinationN({ n, handleChange }: Omit<InputProps, 'r'>) {
  return (
    <input min="0" max="1000" name={INPUT_N} type="number" value={n} onChange={handleChange} />
  );
}

export function CombinationR({ n, r, handleChange }: InputProps) {
  return (
    <input min="0" max={n} name={INPUT_R} type="number" value={r} onChange={handleChange} />
  );
}

export function CombinationFormula({ n, r, handleChange }: InputProps) {
  return (
    <div>
      <CombinationN n={n} handleChange={handleChange} />
      C
      <CombinationR n={n}  r={r} handleChange={handleChange} />
    </div>
  );
}