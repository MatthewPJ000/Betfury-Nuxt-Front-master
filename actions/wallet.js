import { AxiosWithAuth } from '~~/utils/Axios';
import Cookies from 'js-cookie';

//get available currencies
export const getAvailableCurrencies = async (type, store, router) => {
    await AxiosWithAuth('post', '/api/wallet/getAvailableCurrencies', {}, store, router)
        .then(res => {
            if (type == "withdraw")
                store.commit('handleCurrencies', res.data.filter(item => store.state.User.balance.map(uc => uc.name).includes(item.code)));
            else
                store.commit('handleCurrencies', res.data);
        })
        .catch(err => {
            if (err.response)
                store.commit('handleNotification', { type: 'Error', message: err.response.data.message });
            else
                store.commit('handleNotification', { type: 'Error', message: "Network Connection Error." });
        });
}

//get minimum deposit amount
export const getMinimumDepositAmount = async (currency, store, router) => {
    await AxiosWithAuth('post', '/api/wallet/getMinimumDepositAmount', { currency }, store, router)
        .then(res => {
            store.commit('handleMinimumDepositAmount', res.data);
        })
        .catch(err => {
            if (err.response)
                store.commit('handleNotification', { type: 'Error', message: err.response.data.message });
            else
                store.commit('handleNotification', { type: 'Error', message: "Network Connection Error." });
        });
}

//get minimum withdraw amount
export const getMinimumWithdrawAmount = async (currency, store, router) => {
    await AxiosWithAuth('post', '/api/wallet/getMinimumWithdrawAmount', { currency }, store, router)
        .then(res => {
            if (res.data.status == "500") {
                store.commit('handleNotification', { type: 'Error', message: res.data.msg });
                return;
            }
            else {
                store.commit('handleMinimumWithdrawAmount', res.data.result);
            }
        })
        .catch(err => {
            if (err.response)
                store.commit('handleNotification', { type: 'Error', message: err.response.data.message });
            else
                store.commit('handleNotification', { type: 'Error', message: "Network Connection Error." });
        });
}

//deposit
export const deposit = async (currency, amount, store, router) => {
    await AxiosWithAuth('post', '/api/wallet/deposit', { currency, amount }, store, router)
        .then(res => {
            if (res.data.status == "500") {
                store.commit('handleNotification', { type: 'Error', message: res.data.msg });
            }
            if (res.data.status == "200") {
                store.commit('handleNotification', { type: 'Success', message: "Send to this address and confirm on transaction page!" });
                store.commit("handlePayAddress", res.data.data.pay_address);
            }
        })
        .catch(err => {
            if (err.response)
                store.commit('handleNotification', { type: 'Error', message: err.response.data.message });
            else
                store.commit('handleNotification', { type: 'Error', message: "Network Connection Error." });
        });
}

//get withdrawable currencies
export const getAvailablePayoutCurrencies = async (store, router) => {
    await AxiosWithAuth('post', '/api/wallet/getAvailablePayoutCurrencies', {}, store, router)
        .then(res => {
            console.log(res.data)
            if (res.data.status == "500") {
                store.commit('handleCurrencies', []);
                store.commit('handleNotification', { type: 'Error', message: res.data.msg });
            }
            else if (res.data.status == "200") {
                store.commit('handleCurrencies', res.data.data);
            }
        })
        .catch(err => {
            if (err.response)
                store.commit('handleNotification', { type: 'Error', message: err.response.data.message });
            else
                store.commit('handleNotification', { type: 'Error', message: "Network Connection Error." });
        });
}

//get transaction history
export const getTransactionHistory = async (perPage, pageNumber, store, router) => {
    await AxiosWithAuth('post', '/api/wallet/getTransactionHistory', { perPage, pageNumber }, store, router)
        .then(res => {
            store.commit('handleTransactionHistory', res.data);
        })
        .catch(err => {
            if (err.response)
                store.commit('handleNotification', { type: 'Error', message: err.response.data.message });
            else
                store.commit('handleNotification', { type: 'Error', message: "Network Connection Error." });
        });
}

//withdraw
export const withdraw = (store) => { }