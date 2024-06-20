// useStore.js
import { create } from "zustand";
import { AuthApi } from "./UserApi";
import axios from "axios";

export const userStore = create((set) => ({
    userInfo: null,
    challengeInfo: null,
    challengeList: null,
    joinChallengeData: null,
    fetchUserDataLoading: true,
    fetchChallengeDataLoading: true,
    fetchChalengeListLoading: true,
    fetchJoinChallengeDataLoading: true,
    
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
            const fetchData = await AuthApi({token}).get(`/api/v1/user/challenge/${userId}`)
            set({challengeList: fetchData.data, fetchChalengeListLoading: false})
        } catch (error) {
            console.log(error);
            set({fetchChalengeListLoading: false})
        }
    },
    fetchJoinChallengeData: async(challengeId) => {
        try {
            const fetchData = await axios.get(`http://52.78.44.47/api/v1/challenge/detail/${challengeId}`);
            set({joinChallengeData: fetchData, fetchJoinChallengeDataLoading: false})
        } catch (error) {
            console.log(error)
        }
    },
    initUserData: () => {
        set({userInfo: null, challengeInfo: null})
    }
}));
