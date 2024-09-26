<template>
    <q-drawer 
        v-model="store.state.isRightDrawer" 
        side="right" 
        :width="300" 
        :breakpoint="1024"  
        class="p-0 h-full text-white drop-shadow-md relative"
        style="background-color: #161f2c"
    >
        <div class="h-full w-full flex flex-col flex-nowrap justify-between">
            <div
                class="sticky top-0 z-10 flex justify-between items-center px-5 py-3 border-b-[2px] border-gray-300 rounded-b-lg bg-gray-700">
                <p class="text-[16px] font-semibold px-3 py-1 rounded-md">{{ store.state.chatnotification ? "Live Chat" :
                    "Notifications" }}</p>
                <q-icon name="close" class="p-2 hover:bg-gray-800 cursor-pointer rounded-full"
                    @click="() => store.commit('handleRightDrawer', false)" />
            </div>
            <div v-if="store.state.chatnotification" class="overflow-y-auto grow py-2">
                <q-chat-message 
                    class="p-2"
                    :name= store.state.User.username
                    :avatar="`${baseURL}/${store.state.User.avatar}`" 
                    :text="[
                        'doing fine, how r you?',
                        'I just feel like typing a really, really, REALLY long message to annoy you...'
                    ]"  
                    stamp="4 minutes ago" 
                    text-color="white" 
                    bg-color="primary"
                />
            </div>
            <div v-if="store.state.chatnotification"
                class="w-full flex items-end p-3 pt-4 bg-gray-700 rounded-t-lg border-t-[2px]">
                <q-input v-model="chat_text" outlined dense autogrow class="grow" />
                <q-icon name="send" size="md" class="flex-none hover:text-blue-400 text-blue-500 curdor-pointer ml-2 cursor-pointer" />
            </div>
            <div v-if="!store.state.chatnotification" class="overflow-y-auto grow p-3">
                <q-card class="bg-gray-700">
                    <q-card-section>
                        <div class="flex itemx-center justify-between">   
                            <p class="text-[14px]">Deposit completed!</p>
                            <q-icon name="close" class="p-1 hover:bg-gray-800 rounded-full cursor-pointer"/>
                        </div>
                        <p class="text-[12px] p-2 mt-2">The funds( 10 USDTBSC ) have reached your personal address and the payment is finished</p>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-drawer>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import {baseURL} from "@/utils/Axios";

const router = useRouter();
const route = useRoute();
const store = useStore();

const chat_text = ref("");
</script>