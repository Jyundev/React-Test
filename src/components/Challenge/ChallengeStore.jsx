import axios from "axios";
import { useParams } from "react-router-dom";
import { create } from "zustand";

export const challengeStore = create((set) => ({
    challengeInfo: null,
    challengeLoading: true,
    challengeId: parseInt(useParams(), 10),
    fetchChallengeData: async () => {
        try {
            const response = await axios.get('http://52.78.44.47/api/v1/challenge/all');
            set({ challengeInfo: response, challengeLoading: false});
        } catch (e) {
            console.error(e);
            set({challengeLoading: false})
        }
    }
}))