import React from 'react';
import { Formula } from '../types/Types';
import { FORMULA_TYPES } from '../constants/Formulas';

interface FormulaProps {
    activeFormula: Formula;
    onFormulaChange: (formula: Formula) => void;
}

export function FormulaTabs({ activeFormula, onFormulaChange }: FormulaProps) {
    const formulas = Object.values(FORMULA_TYPES);

    return (
        <div className="flex justify-center space-x-3 rounded-xl bg-gray-200 p-1">
            {formulas.map((formula) => (
                <button
                    key={formula}
                    onClick={() => onFormulaChange(formula)}
                    className={`
                        rounded-lg px-3 py-2 test-sm font-medium capitalize shadow
                        ${activeFormula === formula ? 'bg-white text-gray-900 shadow' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                    `} >
                    {formula}
                </button>
            ))}
        </div>
    );
}