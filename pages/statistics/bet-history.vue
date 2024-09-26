<template>
    <q-page class="md:w-[80%] h-fit m-auto md:px-7 px-6">
        <UserStatistics />
        <div class="grid grid-cols-2 gap-3 bg-gray-800 rounded-t-lg mt-5">
            <p class="cursor-pointer text-center lg:text-xl md:text-lg text-md font-semibold py-3 lg:py-5 bg-blue-500 hover:bg-blue-400 rounded-t-lg"
                @click="$router.push('/statistics/bet-history')">Bet History</p>
            <p class="cursor-pointer text-center lg:text-xl md:text-lg text-md font-semibold py-3 lg:py-5 hover:bg-blue-400 rounded-t-lg"
                @click="$router.push('/statistics/game-history')">Game History</p>
        </div>
        <div class="grid xl:grid-cols-4 lg:grid-cols-2 gap-3 w-full bg-gray-800 px-8 py-4 rounded-b-lg">
            <div class="col-span-1 flex flex-col justify-between">
                <p class="font-bold p-2">Type</p>
                <q-btn-dropdown no-caps color="blue-grey-9">
                    <template v-slot:label>
                        <p class="font-semibold">{{ filterType }}</p>
                    </template>
                    <q-list>
                        <q-item clickable v-close-popup @click="filterType = 'All'">
                            <q-item-section>
                                <q-item-label class="font-semibold">All</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="filterType = 'Deposit'">
                            <q-item-section>
                                <q-item-label class="font-semibold">Deposit</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="filterType = 'Withdraw'">
                            <q-item-section>
                                <q-item-label class="font-semibold">Withdraw</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
            <div class="col-span-1 flex flex-col justify-between">
                <p class="font-bold p-2">Currency</p>
                <q-btn-dropdown no-caps color="blue-grey-9">
                    <template v-slot:label>
                        <p class="font-semibold">{{ filterCurrency }}</p>
                    </template>
                    <q-list>
                        <q-item clickable v-close-popup @click="filterCurrency = 'All'">
                            <q-item-section>
                                <q-item-label class="font-semibold">All</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="filterCurrency = currency.code" v-for="currency in []">
                            <q-item-section>
                                <q-item-label class="font-semibold">{{ currency.code }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
            <div class="col-span-2 ">
                <div class="flex items-center">
                    <p class="font-bold mr-2 p-2">From - To</p>
                    <div class="group">
                        <q-icon name="event" size="sm" class="cursor-pointer" />
                        <q-date v-model="filterRange" range class="absolute z-10 group-hover:!block hidden" />
                    </div>
                </div>
                <div class="flex flex-nowrap gap-2 w-full">
                    <q-input dense outlined v-model="filterRange.from" class="grow" />
                    <q-input dense outlined v-model="filterRange.to" class="grow" />
                </div>
            </div>
        </div>
        <q-card>
            <q-card-section class="flex w-full p-8 bg-gray-800 mt-5">
                <p class="font-bold text-lg text-center">Bet History</p>
                <q-table ref="table" :rows="rows" :columns="columns" row-key="name" class="w-full" :loading="loading">
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="type" :props="props">
                                {{ props.row.paymentType }}
                            </q-td>
                            <q-td key="currency" :props="props">
                                {{ props.row.currency }}
                            </q-td>
                            <q-td key="amount" :props="props">
                                {{ props.row.amount }}
                            </q-td>
                            <q-td key="lastbalance" :props="props">
                                {{ props.row.lastbalance }}
                            </q-td>
                            <q-td key="newbalance" :props="props">
                                {{ props.row.newbalance }}
                            </q-td>
                            <q-td key="status" :props="props">
                                <q-badge color="green" class="px-2 py-1">
                                    {{ props.row.status }}
                                </q-badge>
                            </q-td>
                            <q-td key="create" :props="props">
                                {{ dateFormat(props.row.createdAt) }}
                            </q-td>
                            <q-td key="update" :props="props">
                                {{ dateFormat(props.row.updatedAt) }}
                            </q-td>
                        </q-tr>
                    </template>
                    <template v-slot:loading>
                        <q-inner-loading :showing="visible" label="Please wait..." label-class="text-white"
                            label-style="font-size: 1.5em;" />
                    </template>
                </q-table>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<script setup>
import { useStore } from 'vuex';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { getTransactionHistory, getAvailableCurrencies } from "@/actions/wallet";
import UserStatistics from "@/components/common/UserStatistic.vue";

const store = useStore();
const router = useRouter();
const table = ref();
const visible = ref(false);
const filterRange = ref("");
const filterType = ref('All');
const filterCurrency = ref('All');
const progress1 = ref(0.34);

const columns = [
    { name: 'type', required: true, label: 'Type', align: 'left', field: row => row.paymentType, sortable: true },
    { name: 'currency', align: 'left', label: 'Currency', field: row => row.currency, sortable: true },
    { name: 'amount', align: 'left', label: 'Amount', field: row => row.amount, sortable: true },
    { name: 'lastbalance', align: 'left', label: 'Last Balance', field: row => row.lastbalance, sortable: true },
    { name: 'newbalance', align: 'left', label: 'New Balance', field: row => row.newbalance, sortable: true },
    { name: 'status', align: 'left', label: 'Status', field: row => row.status, sortable: true },
    { name: 'create', align: 'left', label: 'Create', field: row => row.createdAt, sortable: true },
    { name: 'update', align: 'left', label: 'Update', field: row => row.updateAt, sortable: true },
]
const rows = [];
// onBeforeMount(async () => {
//     // await getAvailableCurrencies(store, router);
//     // await getTransactionHistory(10, 0, store, router);
//     // visible.value = false
// })

// watch(() => store.state.currencies, async () => {
//     visible.value = true;
//     // await getminimumDepositAmount(store.state.currencies[0].code, store, router);
//     selectedCurrency.value = store.state.currencies[0];
//     visible.value = false;
// })

// const dateFormat = (date) => {
//     return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)} - ${date.slice(11, 13)}:${date.slice(14, 16)}`
// }

useHead({
    title: 'bet history',
    meta: [
        {
            hid: 'bet history',
            name: 'bet history',
            content: 'betfury'
        }
    ]
});

</script>