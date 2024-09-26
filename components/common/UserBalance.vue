<template>
    <div class="px-8 py-4 bg-gray-800 rounded-lg my-5">
        <p class="text-lg font-semibold px-5 my-3"><span class="text-green-500 text-xl font-bold">{{ store.state.User.username }}</span>'s Balance</p>
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-3 mt-5 w-full">
            <div class="flex flex-nowrap items-center justify-start bg-gray-700 p-2 rounded-lg" v-for="currency in store.state.User.balance">
                <div class="bg-white rounded-md w-10 p-1">
                    <QImg :src="`https://nowpayments.io${currency.logo_url}`" class="h-full squared m-auto" />
                </div>
                <div class="ml-3 flex flex-col justify-center">
                    <p class="text-[16px]">{{ currency.name }}</p>
                    <p class="font-semibold text-lg">{{ currency.balance }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
</script>