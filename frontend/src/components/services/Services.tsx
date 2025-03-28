import { BACKEND_URL } from "../constants/Api";
import { FormulaResponse } from "../types/Types";

export const formulaService = {
    async getCombination(n: number, r: number): Promise<FormulaResponse> {
        const response = await fetch(`${BACKEND_URL}/combination?n=${n}&r=${r}`);
        return response.json();
    },

    async getPermutation(n: number, r: number): Promise<FormulaResponse> {
        const response = await fetch(`${BACKEND_URL}/permutation?n=${n}&r=${r}`);
        return response.json();
    },

    async getFactorial(n: number): Promise<FormulaResponse> {
        const response = await fetch(`${BACKEND_URL}/factorial?n=${n}`);
        return response.json();
    }
};