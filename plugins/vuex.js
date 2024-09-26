import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            onLogin: false,             // show/hide login diaolg
            loginRegister: true,
            chatnotification: true,
            isLeftDrawer: false, 
            isRightDrawer: false, 
            isLogin: false,             // login value
            User: {},                   // user profile
            notification: {},           // notification(type,message)
            currencies: [],
            payAddress: "",
            minimumDepositAmount: 0,
            minimumWithdrawAmount: 0,
            estimateAmount: 0,
            transactionHistory: [],
            userBalances: []
        };
    },
    mutations: {
        handleLeftDrawer(state, payload) { state.isLeftDrawer = payload; },
        handleRightDrawer(state, payload) { state.isRightDrawer = payload; },
        handleChatNotification(state, payload) { state.chatnotification = payload; },
        handleLogin(state, payload) { state.isLogin = payload; if(payload === false) state.User = {}; },
        handleOnLogin(state, payload) { state.onLogin = payload; },
        handleGetUser(state, payload) { state.User = payload; },
        handleNotification(state, payload) { state.notification = payload; },
        handleLoginRegister(state, payload) { state.loginRegister = payload; },
        handleCurrencies(state, payload) { state.currencies = payload; },
        handlePayAddress(state, payload) { state.payAddress = payload; },
        handleMinimumDepositAmount(state, payload) { state.minimumDepositAmount = payload; },
        handleMinimumWithdrawAmount(state, payload) { state.minimumWithdrawAmount = payload; },
        handleEstimateAmount(state, payload) { state.estimateAmount = payload; },
        handleTransactionHistory(state, payload) { state.transactionHistory = payload; },
    },
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
    // Install the store instance as a plugin
});
