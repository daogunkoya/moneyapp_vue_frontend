import { defineStore } from 'pinia';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";
import {getAuthorizationHeader} from "@/utils/authService";
import camelize from "camelize";

export const useReceiverrStore = defineStore('receivers', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken') || null,
        receiverList:[],
        activeReceiver:{},
        receiversDataLoaded:false,
        senderId:"",
        receiverId:"",
        activeReceiver:{},
        bankList:[],
        identityTypeList:[],
        transferTypeList:[],
        showUpdateReceiverModal:false,
        showAddReceiverModal:false
    }),
    getters: {
        isAuthenticated: (state) => state.accessToken !== null,
    },
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
            localStorage.setItem('accessToken', token); // Store in localStorage
        },

        setSenderId(senderId){
            return this.senderId = senderId
        },

        setReceiverId(receiverId){
            return this.receiverId = receiverId
        },

        setActiveReceiver(receiver){
            return this.activeReceiver = receiver
        },

        toggleUpdateReceiverModal(){
            this.showUpdateReceiverModal = !this.showUpdateReceiverModal;
        },
        toggleAddReceiverModal(){
            this.showAddReceiverModal = !this.showAddReceiverModal;
        },

        async  fetchReceivers(pageNumber, senderId){
            try {
                const fetchAll = pageNumber === 0?1:"";
                const config = getAuthorizationHeader()
                const response = await axios.get(
                    `${ApiUrl}sender/${senderId}/receivers?page=${pageNumber}&fetchall=${fetchAll}`,
                    config
                );

                const responseData =camelize(response.data);
                this.receiversDataLoaded = true
                this.receiverList= responseData

                if(responseData.banksIdList){
                    const  {bank,proofId, transferTypeList} = responseData.banksIdList;
                    this.bankList = bank;
                    this.identityTypeList = proofId;
                    this.transferTypeList = transferTypeList
                }

                return;

            } catch (error) {
                console.error('Error loading receivers', error);
            }
            return;
        },

        async  updateReceivers(receiverData){
            try {
                const config = getAuthorizationHeader()
              const response  =   await axios.put(`${ApiUrl}sender/${this.senderId}/receivers/${this.receiverId}`,
                    receiverData, config);
                const responseData = response.data;
                this.activeReceiver = {};
                this.showUpdateReceiverModal = false
                return;

            } catch (error) {
                console.error('Error loading receivers', error);
            }
            return;
        },
        async  addReceivers(receiverData){
            try {
                const config = getAuthorizationHeader()
                const response  =   await axios.post(`${ApiUrl}sender/${this.senderId}/receivers`,
                    receiverData, config);
                const responseData = response.data;
                this.activeReceiver = {};
                this.showAddReceiverModal = false
                return;

            } catch (error) {
                console.error('Error loading receivers', error);
            }
            return;
        }

    },
});
