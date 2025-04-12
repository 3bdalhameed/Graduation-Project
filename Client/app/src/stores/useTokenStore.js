import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useTokenStore = (set) => ({
    token: null,
    role : null,
    setRole: (newRole) => set({role: newRole}),
    clearRole: () => set({role: null}),
    setToken: (newToken) => set({token: newToken}),
    clearToken: () => set({token: null}),
    isLoggedIn: () => !!set.getState().token,
    getToken: () => set.getState().token,

});


export default create(persist(useTokenStore, {name: 'access_token'}));