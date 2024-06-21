// useStore.js
import { create } from "zustand";
import { AuthApi } from "./UserApi";

export const userStore = create((set) => ({
    userInfo: null,
    challengeInfo: null,
    challengeList: null,
    fetchUserDataLoading: true,
    fetchChallengeDataLoading: true,
    fetchChalengeListLoading: true,
    
    fetchUserData: async () => {
        set({fetchUserDataLoading: false})
        try {
            const AUTH = import.meta.env.VITE_AUTH
            const token = localStorage.getItem('token');
            const response = await AuthApi({token}).get(AUTH);
            set({ userInfo: response.data, fetchUserDataLoading: false });
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ fetchUserDataLoading: false });
        }
    },
    fetchChallengeData: async({ challengeId, userId }) => {
        try {
            set({fetchChallengeDataLoading: true})
            const token = localStorage.getItem('token');
            const CHALLENGE = import.meta.env.VITE_CHALLENEGE
            const fetchData = await AuthApi({token}).get(`${CHALLENGE}${challengeId}/${userId}`);
            set({ challengeInfo: fetchData.data, fetchChallengeDataLoading: false })
        } catch (error) {
            console.log(error)
            set({ fetchChallengeDataLoading: false })
        }
    },
    fetchChallengeList: async() => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId')
            const VIEW = import.meta.env.VITE_CHALLENEGE_VIEW
            const fetchData = await AuthApi({token}).get(`${VIEW}${userId}`)
            set({challengeList: fetchData.data, fetchChalengeListLoading: false})
        } catch (error) {
            console.log(error);
            set({fetchChalengeListLoading: false})
        }
    },
    initUserData: () => {
        set({userInfo: null, challengeInfo: null})
    }
}));
