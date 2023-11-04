import { defineStore } from 'pinia';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";

export const useSenderStore = defineStore('senders', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken') || null,
    }),
    getters: {
        isAuthenticated: (state) => state.accessToken !== null,
    },
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
            localStorage.setItem('accessToken', token); // Store in localStorage
        },


    },
});
