<template>
  <q-page class="md:w-[80%] h-fit m-auto md:px-7 px-6">
    <UserBalance />
    <div class="grid grid-cols-3 gap-3 bg-gray-800 rounded-t-lg">
      <p class="cursor-pointer text-center lg:text-xl md:text-lg text-md font-semibold py-3 lg:py-5 hover:bg-blue-400 rounded-t-lg" @click="$router.push('/wallet/deposit')">Deposit</p>
      <p class="cursor-pointer text-center lg:text-xl md:text-lg text-md font-semibold py-3 lg:py-5 bg-blue-500 hover:bg-blue-400 rounded-t-lg">Withdraw</p>
      <p class="cursor-pointer text-center lg:text-xl md:text-lg text-md font-semibold py-3 lg:py-5 hover:bg-blue-400 rounded-t-lg" @click="$router.push('/wallet/transactions')">Transactions</p>
    </div>
    <q-card>
      <q-card-section class="flex w-full p-8 bg-gray-800" v-if="store.state.User.balance && store.state.User.balance.length">
        <div class="flex flex-col justify-around w-full xl:w-[80%] lg:w-[90%] mx-auto">
          <div class="flex flex-col gap-5">
            <q-input v-model="payAddress" dense outlined :placeholder="`Input ${selectedCurrency.code} Address`"/>
            <div class="flex gap-2">
              <q-input outlined v-model="withdrawAmount" dense class="grow" placeholder="Input Withdraw amount" />
              <q-btn color="primary text-bold" no-caps :label="`${selectedCurrency.code} Withdraw`"
              :disable="withdrawAmount > selectedCurrency.amount ? true : false" @click="() => onWithdraw()" />
            </div>
          </div>
          <div class="flex items-center flex-nowrap bg-gray-700 rounded-lg p-3 mt-5">
            <q-icon name="warning" color="yellow" size="md" />
            <p class="pl-2">You can withdraw less than <span class="font-semibold text-lg">10{{selectedCurrency.amount }}</span> {{ selectedCurrency.code }}</p>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="flex items-center w-full p-8 bg-gray-800" v-if="!store.state.User.balance || !store.state.User.balance.length">
            <q-icon name="warning" color="yellow" size="md" />
            <p class="pl-2 text-lg font-semibold">There is no withdrawable currencies.</p>
      </q-card-section>
      <q-inner-loading :showing="visible" label="Please wait..." label-class="text-white"
        label-style="font-size: 1.5em;" />
    </q-card>
    <div class="grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 mt-3">
      <div v-for="currency in store.state.currencies" @click="selectCurrency(currency)"
        class="flex flex-nowrap rounded-lg hover:bg-gray-800 border-[2px] border-gray-500 hover:border-yellow-500 hover:cursor-pointer"
        :class="selectedCurrency == currency ? 'bg-gray-800 border-yellow-500' : ''">
        <div class="bg-white rounded-lg m-4 p-2">
          <QImg :src="`https://nowpayments.io/${currency.logo_url}`" class="w-10 h-10" />
        </div>
        <div class="flex flex-col justify-center">
          <p class="font-bold text-lg pb-2">{{ currency.code }}</p>
          <p>{{ currency.name }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useStore } from 'vuex';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { withdraw, getAvailableCurrencies, getMinimumWithdrawAmount } from "@/actions/wallet";
import UserBalance from '@/components/common/UserBalance';

const store = useStore();
const router = useRouter();
const selectedCurrency = ref({});
const withdrawAmount = ref(0);
const visible = ref(true);
const payAddress = ref("");

onBeforeMount(async () => {
  store.commit('handleCurrencies', []);
  await getAvailableCurrencies("withdraw", store, router);
  visible.value = false
})

watch(() => store.state.currencies, async () => {
  visible.value = true;
  if(store.state.currencies.length){
    await getMinimumWithdrawAmount(store.state.currencies[0].code, store, router)
    selectedCurrency.value = store.state.currencies[0];
  }
  visible.value = false;
})

const selectCurrency = async (currency) => {
  visible.value = true;
  store.commit('handlePayAddress', '')
  await getMinimumWithdrawAmount(currency.code, store, router)
  selectedCurrency.value = currency;
  visible.value = false;
}

const onWithdraw = async () => {
  if(payAddress.value == ""){
    store.commit('handleNotification',{type:'Error',message: `Input ${selectedCurrency.value.code} Address`});
    return;
  }
  if(payAddress.value == ""){
    store.commit('handleNotification',{type:'Error',message: `Input ${selectedCurrency.value.code} Address`});
    return;
  }
  visible.value = true;
  await withdraw(selectedCurrency.value.code, withdrawAmount.value, store);
  visible.value = false;
}

useHead({
  title: 'withdraw',
  meta: [
    {
      hid: 'withdraw',
      name: 'withdraw',
      content: 'betfury'
    }
  ]
});

</script>