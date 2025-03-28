import { FORMULA_TYPES } from "../constants/Formulas";

export type Formula = typeof FORMULA_TYPES[keyof typeof FORMULA_TYPES];

export interface FormulaResponse {
  result: number;
  formula: string[];
}