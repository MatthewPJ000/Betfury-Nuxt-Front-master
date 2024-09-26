<template>
    <QHeader class="bg-[#161f2c] py-1 px-2 drop-shadow-xl">
        <QToolbar class="p-2 flex justify-between bg-transparent">
            <div class="flex flex-row bg-transparent flex-nowrap w-full items-center justify-between">
                <div class="flex felx-row items-center justify-between">
                    <div class="w-[30px] mr-2">
                        <QImg class="cursor-pointer bg-transparent"
                            :src="store.state.isLeftDrawer ? `/imgs/header/menu_left.png` : `/imgs/header/menu_right.png`"
                            alt="menu" @click="() => store.commit('handleLeftDrawer', !store.state.isLeftDrawer)" />
                    </div>
                    <div>
                        <QImg class="cursor-pointer bg-transparent w-[200px]" src="/imgs/header/logo.svg" alt="menu"
                            @click="() => router.push('/')" />
                    </div>
                </div>
                <div v-if="!store.state.isLogin">
                    <q-btn
                        @click="() => { store.commit('handleOnLogin', true); store.commit('handleLoginRegister', true); }"
                        color="primary" label="Log In" no-caps class="font-bold px-5 py-2 m-1" />
                    <q-btn
                        @click="() => { store.commit('handleOnLogin', true); store.commit('handleLoginRegister', false); }"
                        style="background: #FF0000; color: white" label="Sing Up" no-caps class="font-bold px-5 py-2 m-1" />
                </div>
                <div v-if="store.state.isLogin" class="flex">
                    <q-btn-dropdown no-caps class="bg-gray-700 hover:bg-gray-600 mx-1">
                        <template v-slot:label>
                            <div class="flex flex-nowrap items-center">
                                <div class="flex flex-nowrap items-center">
                                    <div class="bg-white rounded-md w-8 p-1">
                                        <QImg :src="`https://nowpayments.io${currentCurrency.logo_url}`"
                                            class="h-full squared m-auto" />
                                    </div>
                                    <p class="ml-2 text-md">{{ currentCurrency.name }}</p>
                                </div>
                                <p class="font-semibold text-lg ml-3">{{ currentCurrency.balance }}</p>
                            </div>
                        </template>
                        <q-list>
                            <q-item clickable v-close-popup @click="currentCurrency = currency"
                                v-for="currency in store.state.User.balance">
                                <q-item-section>
                                    <div class="flex flex-nowrap items-center">
                                        <div class="flex flex-nowrap items-center">
                                            <div class="bg-white rounded-md w-8 p-1">
                                                <QImg :src="`https://nowpayments.io${currency.logo_url}`"
                                                    class="h-full squared m-auto" />
                                            </div>
                                            <p class="ml-2 text-md">{{ currency.name }}</p>
                                        </div>
                                        <p class="font-semibold text-lg ml-3">{{ currency.balance }}</p>
                                    </div>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                    <div
                        class="group relative mx-1 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 w-20 h-10 cursor-pointer">
                        <QImg :src="`${baseURL}/${store.state.User.avatar}`" class="rounded-full w-7 h-7 mx-2" />
                        <q-icon name="keyboard_arrow_down" size="sm" color="white" />
                        <div
                            class="group-hover:!block hidden absolute top-full right-0 bg-[#161f2c] w-[280px] rounded-lg p-4">
                            <div class="flex justify-center gap-3 mt-3">
                                <QImg 
                                    :src="`${baseURL}/${store.state.User.avatar}`"
                                    class="rounded-full w-[70px] h-[70px] mx-2" />
                                <div class="flex flex-col justify-around">
                                    <p class="text-white text-[20px] font-semibold shadow-2xl">{{ store.state.User.username }}</p>
                                    <p
                                        class="text-center rounded-full text-gray-300 bg-gray-700 hover:bg-gray-600 px-5 w-fit">
                                        Log out</p>
                                </div>
                            </div>
                            <div class="bg-gray-700 mt-3 w-full px-5 py-3 rounded-md bg-opacity-30">
                                <div class="px-2 py-2 flex items-center text-gray-300 text-[16px] cursor-pointer rounded-md"
                                    :class="route.path == '/profile' ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-200'"
                                    @click="() => router.push('/profile')">
                                    <q-icon name="person" size="sm" color="gray" class="mr-2" />
                                    <p>My Profile</p>
                                </div>
                                <div class="px-2 py-2 flex items-center text-gray-300 text-[16px] cursor-pointer rounded-md"
                                    :class="route.path == '/statistics/game-history' ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-200'"
                                    @click="() => router.push('/statistics/game-history')">
                                    <q-icon name="browse_gallery" size="sm" color="gray" class="mr-2" />
                                    <p>Game History</p>
                                </div>
                                <div class="px-2 py-2 flex items-center text-gray-300 text-[16px] cursor-pointer rounded-md"
                                    :class="route.path == '/statistics/bet-history' ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-200'"
                                    @click="() => router.push('/statistics/bet-history')">
                                    <q-icon name="history_edu" size="sm" color="gray" class="mr-2" />
                                    <p>Bet History</p>
                                </div>
                                <div class="px-2 py-2 flex items-center text-gray-300 text-[16px] cursor-pointer rounded-md"
                                    :class="route.path == '/wallet/deposit' ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-200'"
                                    @click="() => router.push('/wallet/deposit')">
                                    <q-icon name="cloud_upload" size="sm" color="gray" class="mr-2" />
                                    <p>Deposit</p>
                                </div>
                                <div class="px-2 py-2 flex items-center text-gray-300 text-[16px] cursor-pointer rounded-md"
                                    :class="route.path == '/wallet/withdraw' ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-200'"
                                    @click="() => router.push('/wallet/withdraw')">
                                    <q-icon name="cloud_download" size="sm" color="gray" class="mr-2" />
                                    <p>Withdraw</p>
                                </div>
                                <div class="px-2 py-2 flex items-center text-gray-300 text-[16px] cursor-pointer rounded-md"
                                    :class="route.path == '/wallet/transactions' ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-200'"
                                    @click="() => router.push('/wallet/transactions')">
                                    <q-icon name="feed" size="sm" color="gray" class="mr-2" />
                                    <p>Transaction History</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mx-1 relative flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 w-10 h-10 cursor-pointer"
                        @click="() => { store.commit('handleRightDrawer', true); store.commit('handleChatNotification', false); }">
                        <q-icon name="notifications" size="sm" color="gray-400" class="z-1" />
                        <p
                            class="bg-red-500 rounded-full h-5 px-2 text-sm text-center text-white font-bold z-10 absolute -top-1 -right-2">
                            1</p>
                    </div>
                    <div class="mx-1 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 w-10 h-10 cursor-pointer"
                        @click="() => { store.commit('handleRightDrawer', true); store.commit('handleChatNotification', true); }">
                        <q-icon name="question_answer" size="sm" color="gray-400" />
                    </div>
                </div>
            </div>
        </QToolbar>
    </QHeader>
</template>
<script setup lang="ts">
import {watch} from "vue";
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { useRouter, useRoute } from "vue-router";
import { baseURL } from "@/utils/Axios";

const store = useStore();
const router = useRouter();
const route = useRoute();

const { dark } = useQuasar();
dark.set(true);

const currentCurrency = ref();

watch(()=>store.state.User.balance, ()=>{
    if(store.state.User.balance.length) 
        currentCurrency.value = store.state.User.balance[0]
})

</script>

