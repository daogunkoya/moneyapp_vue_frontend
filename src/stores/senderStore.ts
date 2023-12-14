import { defineStore } from 'pinia';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";
import {getAuthorizationHeader} from "@/utils/authService";
import camelize from "camelize";

export const useSenderStore = defineStore('senders', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken') || null,
        senderList:[],
        activeSender:{},
        sendersDataLoaded:false,
        senderId:"",
        senderId:"",
        activeSender:{},
        showAddSenderModal:false
    }),
    getters: {
        isAuthenticated: (state) => state.accessToken !== null,
    },
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
            localStorage.setItem('accessToken', token); // Store in localStorage
        },

        async  fetchSenders(pageNumber){
            try {
                const fetchAll = pageNumber === 0?1:"";
                const config = getAuthorizationHeader()
                const response = await axios.get(
                    `${ApiUrl}senders?page=${pageNumber}&fetchall=${fetchAll}`,
                    config
                );

                const responseData = camelize(response.data);
                this.sendersDataLoaded = true
                this.senderList= responseData


                return;

            } catch (error) {
                console.error('Error loading senders', error);
            }
            return;
        },

        async  updateSender(senderData){
            try {
                const config = getAuthorizationHeader()
                const response  =   await axios.put(`${ApiUrl}senders`,
                    senderData, config);
                const responseData = response.data;
                this.activeSender = {};
                this.showUpdateSenderModal = false
                return;

            } catch (error) {
                console.error('Error loading senders', error);
            }
            return;
        },
        async  addSender(senderData){
            try {
                const config = getAuthorizationHeader()
                const response  =   await axios.post(`${ApiUrl}sender/${this.senderId}`,
                    senderData, config);
                const responseData = response.data;
                this.activeSender = {};
                this.showAddSenderModal = false
                return;

            } catch (error) {
                console.error('Error loading senders', error);
            }
            return;
        }

    },
});
