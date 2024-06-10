// useStore.js
import { create } from "zustand";
import { AuthApi } from "./UserApi";
import axios from "axios";

export const userStore = create((set) => ({
    userInfo: null,
    challengeInfo: null,
    fetchUserDataLoading: true,
    fetchChallengeDataLoading: true,
    fetchUserData: async () => {
        try {
            const response = await AuthApi.get('/api/v1/user/Auth');
            set({ userInfo: response.data, fetchUserDataLoading: false });
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ isLoading: false });
        }
    },
    fetchChallengeData: async({ challengeId }) => {
        const fetchData = await axios.get(`http://52.78.44.47/api/v1/challenge/detail/${challengeId}`);
        set({ challengeInfo: fetchData.data, fetchChallengeDataLoading: false })
    }
}));
