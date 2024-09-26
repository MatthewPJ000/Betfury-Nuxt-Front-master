<template>
    <q-drawer
        v-model="store.state.isLeftDrawer"
        show-if-above
        side="left"
        :width="240"
        :breakpoint="1024"
        class="p-0 overflow-x-hidden text-white shadow-md"
        style="background-color: #161f2c"
        @before-hide="store.commit('handleLeftDrawer', false)"
    >
        <div class="flex flex-col h-full w-full justify-between items-between">
            <div class="w-full py-2"> 
                <div class="flex items-center text-gray-400 text-[16px] font-bold py-2 px-4 mx-5 my-2 cursor-pointer rounded-md" :class="route.path == '/games' ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-300'" @click="()=>router.push('/games')"> <q-icon name="sports_esports" size="sm" color="gray" class="mr-3"/><p>Games</p></div>
                <div class="flex items-center text-gray-400 text-[16px] font-bold py-2 px-4 mx-5 my-2 cursor-pointer rounded-md" :class="route.path.includes('statistics') ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-300'" @click="()=>router.push('/statistics/bet-history')"> <q-icon name="auto_graph" size="sm" color="gray" class="mr-3"/><p>Statistics</p></div>
                <div class="flex items-center text-gray-400 text-[16px] font-bold py-2 px-4 mx-5 my-2 cursor-pointer rounded-md" :class="route.path.includes('wallet') ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-300'" @click="()=>router.push('/wallet/transactions')"> <q-icon name="account_balance" size="sm" color="gray" class="mr-3"/><p>Wallet</p></div>
                <div class="flex items-center text-gray-400 text-[16px] font-bold py-2 px-4 mx-5 my-2 cursor-pointer rounded-md" :class="route.path == '/profile' ? 'text-white bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-300'" @click="()=>router.push('/profile')"> <q-icon name="account_circle" size="sm" color="gray" class="mr-3"/><p>Profile</p></div>
            </div>
            <div v-if="store.state.isLogin" class="w-full">
                <div class="flex items-center text-gray-400 text-[16px] font-semibold py-2 px-4 mx-5 my-2 cursor-pointer hover:bg-gray-700 rounded-md" @click="()=>logout(store, router)"> <q-icon name="logout" size="sm" color="gray" class="mr-3"/><p>Log Out</p></div>
            </div>
        </div>
    </q-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute} from 'vue-router';
import {logout} from '~~/actions/auth';

const router = useRouter();
const route = useRoute();
const store = useStore();
</script>