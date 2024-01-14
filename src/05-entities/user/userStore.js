import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        bearerToken: undefined,
        isAuthenticated: false,
    })
})