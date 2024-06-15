// useStore.js
import { create } from "zustand";
import { AuthApi } from "./UserApi";

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
            set({ fetchUserDataLoading: false });
        }
    },
    fetchChallengeData: async({ challengeId, userId }) => {
        try {
            const fetchData = await AuthApi.get(`/api/v1/user/challengePage/${challengeId}/${userId}`);
            set({ challengeInfo: fetchData.data, fetchChallengeDataLoading: false })
        } catch (error) {
            console.log(error)
            set({ fetchChallengeDataLoading: false })
        }
    },
    initUserData: () => {
        set({userInfo: null, challengeInfo: null})
    }
}));
