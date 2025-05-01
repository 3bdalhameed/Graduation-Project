import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTokenStore = create(persist((set, get) => ({
    token: null,
    role: null,

    setRole: (newRole) => set({ role: newRole }),
    clearRole: () => set({ role: null }),
    setToken: (newToken) => set({ token: newToken }),
    clearToken: () => set({ token: null }),

    isLoggedIn: () => !!get().token,
    getToken: () => get().token,
}), { name: 'access_token' }));

export default useTokenStore;
