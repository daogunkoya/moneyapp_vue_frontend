import { defineStore } from 'pinia';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";
import {getAuthorizationHeader} from "@/utils/authService";
import camelize from "camelize";
import {throttle, camelCase, debounce} from 'lodash';

export const useTransactionStore = defineStore('transactions', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken') || null,
        transactionList:[],
        activeTransaction:{},
        transactionsDataLoaded:false,
        sendAmountCalculationResponse:{},
        senderId:"",
        receiverId:"",
        activeReceiver:{},
        showAddTransactionModal:false,
        showUpdateTransactionModal:false,
        exchangeRate:0,
        selectedReceiver:null,
        selectedSender:null,
        showSummaryPage:false,
        transactionData:null,
        bankList:[],
        identityTypeList:[],
    }),
    getters: {
        isAuthenticated: (state) => state.accessToken !== null,
    },
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
            localStorage.setItem('accessToken', token); // Store in localStorage
        },
        userTransactionData(selectedSender: {}, selectedReceiver:{}, transaction){
            this.selectedSender = selectedSender;
            this.selectedReceiver = selectedReceiver;
            this.transactionData = transaction;
        },

        toggleAddTransactionModal() {
            this.showAddTransactionModal = !this.showAddTransactionModal;
        },
        setActiveTransaction(transaction){
            return this.activeTransaction = transaction
        },

        toggleUpdateTransactionModal(){
            this.showUpdateTransactionModal = !this.showUpdateTransactionModal;
        },


        removeFormatting (value)  {
            // Replace any non-numeric characters with an empty string
            const numericValue = value.replace(/[^0-9.]/g, '');

            // Parse the numeric value to a float
            return parseFloat(numericValue);
        },

        async  calculateSendAmount(sendAmount,conversionType){
            try {
                const amountToSend = this.removeFormatting(sendAmount);
                const fetchUrl = `${ApiUrl}commissions/value?amount=${amountToSend}&conversion_type=${conversionType}`
                console.log(fetchUrl)
                const response = await fetch(fetchUrl);
                const data = await response.json();

                if (data) {
                    this.sendAmountCalculationResponse = camelize(data)
                } else {
                    console.error('Data is undefined.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async  fetchTransactions(pageNumber){
            try {
                const config = getAuthorizationHeader()
                const response = await axios.get(
                    `${ApiUrl}transactions?page=${pageNumber}`,
                    config
                );
                const data = camelize(response.data);
                if (data) {
                    this.transactionList = data;
                   this.transactionsDataLoaded = true
                    const  {bank,proofId, transferTypeList} = data.banksIdList;
                    this.bankList = bank;
                    this.identityTypeList = proofId;
                    this.transferTypeList = transferTypeList
                } else {
                    console.error('Data is undefined.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async  fetchExchangeRate(pageNumber){
            try {
                const config = getAuthorizationHeader()
                const response = await axios.get(
                    `${ApiUrl}rates/today`,
                    config
                );
                const data = response.data;
                if (data) {
                    this.exchangeRate = camelize(data);
                } else {
                    console.error('Data is undefined.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async  addTransaction(transactionData){
            try {
                const config = getAuthorizationHeader()
                const response  =   await axios.post(`${ApiUrl}transactions/`,
                    transactionData, config);
                const responseData = response.data;

                this.transactionsDataLoaded = false;

                await this.fetchTransactions(1);

                return;

            } catch (error) {
                console.error('Error loading senders', error);
            }
            return;
        },
        async  updateTransaction(transactionData){

                const data = {
                    receiver_fname:transactionData.receiverFirstName,
                    receiver_lname:transactionData.receiverLastName,
                    receiver_bank_id:transactionData.receiverBankId,
                    receiver_identity_id:transactionData.receiveridentity,
                    receiver_account_no:transactionData.receiverAccountNumber,
                    receiver_transfer_type:transactionData.receiverTransferOption,
                    receiver_phone:transactionData.receiverPhone,
                };
                console.log(transactionData.transactionId)
            try {
                const config = getAuthorizationHeader()
                const response  =   await axios.put(`${ApiUrl}transactions/${transactionData.transactionId}`,
                    data, config);
                const responseData = response.data;

                this.transactionsDataLoaded = false;

                await this.fetchTransactions(1);

                return;

            } catch (error) {
                console.error('Error loading senders', error);
            }
            return;
        }

    },
});
