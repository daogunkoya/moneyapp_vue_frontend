import { defineStore } from 'pinia';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken') || null,
        tokenExpiration: localStorage.getItem('tokenExpiration') || null,
        rememberMe: localStorage.getItem('rememberMe') === 'true', // Convert to boolean
    }),
    getters: {
        isAuthenticated: (state) => state.accessToken !== null,
    },
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
            localStorage.setItem('accessToken', token); // Store in localStorage
        },
        logout() {
            this.accessToken = null;
            localStorage.removeItem('accessToken'); // Remove from localStorage when logging out
        },
        async login({ email, password }) {
            try {
                // Make the POST request using Axios
                const response = await axios.post(`${ApiUrl}users/login`, {
                    email,
                    password,
                });

                if (response.status === 200) {
                    const data = response.data;
                    const accessToken = data.access_token;
                    this.setAccessToken(accessToken);
                    this.setTokenExpiration(new Date(data.expires_in).getTime());



                    return true; // Indicate a successful login
                } else {
                    console.error('Login failed');
                    return false; // Indicate a failed login
                }
            } catch (error) {
                console.error('An error occurred', error);
                return false; // Indicate a failed login
            }
        },
        getAccessToken() {
            return this.accessToken || localStorage.getItem('accessToken');
        },
        clearAccessToken() {
            this.accessToken = null;
            localStorage.removeItem('accessToken'); // Clear from localStorage
        },
        setTokenExpiration(expirationTime: number) {
            this.tokenExpiration = expirationTime;
            localStorage.setItem('tokenExpiration', expirationTime.toString());
        },
        getTokenExpiration() {
            return this.tokenExpiration || localStorage.getItem('tokenExpiration');
        },
        checkTokenExpiry() {
            if (this.tokenExpiration) {
                // Parse the expiration time from the API response
                if (Date.now() > this.tokenExpiration) {
                    this.clearAccessToken();
                }
            }
        },
    },
});
