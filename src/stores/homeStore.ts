import { defineStore } from 'pinia';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";
import {getAuthorizationHeader} from "@/utils/authService";
import camelize from "camelize";
import {throttle, camelCase, debounce} from 'lodash';

export const useHomeStore = defineStore('home', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken') || null,
        transactionList:[],
        senderList:[],
        exchangeRate:0,
        senderTransactionData:null
    }),
    getters: {
        isAuthenticated: (state) => state.accessToken !== null,
    },
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
            localStorage.setItem('accessToken', token); // Store in localStorage
        },



        async  fetchHomeContent(pageNumber, type){
            try {
                const config = getAuthorizationHeader()
                const response = await axios.get(
                    `${ApiUrl}?page=${pageNumber}&type=${type}`,
                    config
                );
                const data = camelize(response.data);

                if (data) {
                    this.senderTransactionData = data;
                    const { senders, transactions, rate } = data;
                    this.senderList = senders;
                    this.transactionList = transactions;
                    this.exchangeRate = rate['mainRate'];

                } else {
                    console.error('Data is undefined.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

    },
});
