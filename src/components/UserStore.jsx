// useStore.js
import { create } from "zustand";
import { AuthApi } from "./UserApi";

export const userStore = create((set) => ({
    userInfo: null,
    userToken: null,
    challengeInfo: null,
    fetchUserDataLoading: true,
    fetchChallengeDataLoading: true,
    fetchUserToken: () => {
        const token = localStorage.getItem('token');
        set({userToken: token});
    },
    fetchUserData: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await AuthApi({token}).get('/api/v1/user/Auth');
            set({ userInfo: response.data, fetchUserDataLoading: false });
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ fetchUserDataLoading: false });
        }
    },
    fetchChallengeData: async({ challengeId, userId }) => {
        try {
            const token = localStorage.getItem('token');
            const fetchData = await AuthApi({token}).get(`/api/v1/user/challengePage/${challengeId}/${userId}`);
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
