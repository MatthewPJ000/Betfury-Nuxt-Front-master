<template>
    <div class="grid grid-cols-3 gap-3 px-8 py-4 bg-gray-800 rounded-lg mt-5">
        <div class="col-span-1 flex items-around">
            <QImg :src="`${baseURL}/${store.state.User.avatar}`" class="rounded-full w-[60%] ml-[20%] my-auto mt-5" />
            <p class="text-lg text-center font-bold my-auto mt-5 mb-5 w-full">{{ store.state.User.username }}</p>
        </div>
        <div class="col-span-2 flex items-around">
            <div class="w-full">
                <div class="flex justify-center w-full">
                    <p class="-mb-3 ">Rank {{ store.state.User.vipLevel}} <span class="text-center ml-2 px-3 bg-blue-500 rounded-md">3/100</span></p>
                </div>
                <div class="flex flex-nowrap items-end w-[80%] mx-auto">
                    <q-icon name="home" size="md" color="blue-6" class="-mr-2" />
                    <div class="relative grow mb-[5px]">
                        <q-linear-progress stripe size="7px" background-color="gray-3" color="blue-7" :value="progress1" />
                        <div class="absolute h-6 w-[6px] rounded-full bg-yellow z-10 -top-2" :class="`left-[3%]`"></div>
                    </div>
                    <q-icon name="home" size="md" color="blue-6" class="-ml-2" />
                </div>
            </div>
            <div class="w-full">
                <p class="text-lg font-semibold py-2">Chat</p>
                <div class="grid grid-cols-2 gap-5">
                    <div class="flex justify-start items-center gap-3 px-4 py-2 rounded-lg bg-gray-700">
                        <q-icon size="md" name="message" />
                        <div>
                            <p class="">Total Messages</p>
                            <p class>1</p>
                        </div>
                    </div>
                    <div class="flex justify-start items-center gap-3 px-4 py-2 rounded-lg bg-gray-700">
                        <q-icon size="md" name="favorite" />
                        <div>
                            <p class="">Likes Received</p>
                            <p class>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <p class="text-lg font-semibold py-2">Bet</p>
                <div class="grid grid-cols-2 gap-5">
                    <div class="flex justify-start items-center gap-3 px-4 py-2 rounded-lg bg-gray-700">
                        <q-icon size="md" name="currency_exchange" />
                        <div>
                            <p class="">Total Wegered</p>
                            <p class>0</p>
                        </div>
                    </div>
                    <div class="flex justify-start items-center gap-3 px-4 py-2 rounded-lg bg-gray-700">
                        <q-icon size="md" name="monetization_on" />
                        <div>
                            <p class="">Total Bet</p>
                            <p class>0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {baseURL} from "@/utils/Axios";

const store = useStore();
const router = useRouter();
const progress1 = ref(0.03);

</script>