<template>
  <q-page class="md:w-[80%] h-fit m-auto md:px-7 px-6">
    <UserBalance />
    <div class="grid grid-cols-3 gap-3 bg-gray-800 rounded-t-lg">
      <p class="cursor-pointer text-center lg:text-xl md:text-lg text-md font-semibold py-3 lg:py-5 bg-blue-500 hover:bg-blue-400 rounded-t-lg">Deposit</p>
      <p class="cursor-pointer text-center lg:text-xl md:text-lg text-md font-semibold py-3 lg:py-5 hover:bg-blue-400 rounded-t-lg" @click="$router.push('/wallet/withdraw')">Withdraw</p>
      <p class="cursor-pointer text-center lg:text-xl md:text-lg text-md font-semibold py-3 lg:py-5 hover:bg-blue-400 rounded-t-lg" @click="$router.push('/wallet/transactions')">Transactions</p>
    </div>

    <q-card>
      <q-card-section class="flex w-full p-8 bg-gray-800">
        <div class="flex flex-col justify-around lg:w-[70%] md:w-[60%] w-full pr-5 mb-5 md:mb-0">
          <div class="flex gap-2 my-2">
            <q-input outlined v-model="depositAmount" dense class="grow" placeholder="Input deposit amount" />
            <q-btn color="primary text-bold" no-caps :label="`${selectedCurrency.code} Deposit`"
              :disable="depositAmount < store.state.minimumDepositAmount ? true : false" @click="() => onDeposit()" />
          </div>
          <div class="flex items-center flex-nowrap bg-gray-700 rounded-lg p-3 my-2">
            <q-icon name="warning" color="yellow" size="md" />
            <p class="pl-2">The minimum deposit amount is <span class="font-bold text-lg">{{ store.state.minimumDepositAmount
            }}</span> {{ selectedCurrency.code }}</p>
          </div>
          <p class="text-md my-2">This address accepts only <span
              class="font-bold text-lg uppercase">{{ selectedCurrency.network }}</span> network (mainnet). Copy address
            here:</p>
          <q-input v-model="store.state.payAddress" dense outlined readonly>
            <template v-slot:append>
              <q-icon name="content_copy" class="hover:text-blue-500 cursor-pointer" size="sm" />
            </template>
          </q-input>
        </div>
        <vue-qrcode :value="store.state.payAddress" v-if="store.state.payAddress"
          class="rounded-xl xl:w-[25%] lg:w-[30%] md:w-[40%] w-[60%] mx-auto md:square md:mb-auto" />
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
import VueQrcode from 'vue-qrcode';
import { getAvailableCurrencies, getMinimumDepositAmount, deposit } from "@/actions/wallet";
import UserBalance from '@/components/common/UserBalance';

const store = useStore();
const router = useRouter();
const selectedCurrency = ref({});
const depositAmount = ref(0);
const visible = ref(true);

onBeforeMount(async () => {
  store.commit('handleCurrencies', []);
  await getAvailableCurrencies("deposit", store, router);
  visible.value = false
})

watch(() => store.state.currencies, async () => {
  visible.value = true;
  if(store.state.currencies.length){
    await getMinimumDepositAmount(store.state.currencies[0].code, store, router)
    selectedCurrency.value = store.state.currencies[0];
  }
  visible.value = false;
})

const selectCurrency = async (currency) => {
  visible.value = true;
  store.commit('handlePayAddress', '')
  await getMinimumDepositAmount(currency.code, store, router)
  selectedCurrency.value = currency;
  visible.value = false;
}

const onDeposit = async () => {
  visible.value = true;
  await deposit(selectedCurrency.value.code, depositAmount.value, store, router);
  visible.value = false;
}

useHead({
  title: 'deposit',
  meta: [
    {
      hid: 'deposit',
      name: 'deposit',
      content: 'betfury'
    }
  ]
});

</script>