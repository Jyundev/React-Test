// useStore.js
import { create } from "zustand";
import { AuthApi } from "./UserApi";

export const userStore = create((set) => ({
    userInfo: null,
    isLoading: true,
    fetchUserData: async () => {
        try {
            const response = await AuthApi.get('/api/v1/user/user');
            set({ userInfo: response.data, isLoading: false });
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ isLoading: false });
        }
    }
}));
