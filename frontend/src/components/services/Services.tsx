import { BACKEND_URL } from "../constants/Api";
import { CombinationResponse } from "../types/Types";

export const combinationService = {
    async getCombination(n: number, r: number): Promise<CombinationResponse> {
        const response = await fetch(`${BACKEND_URL}/combination?n=${n}&r=${r}`);
        return response.json();
    }
};