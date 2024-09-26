<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar'
import {useRoute , useRouter} from 'vue-router';

import HeaderComponent from '@/components/header/HeaderComponent.vue';
import LeftSideBarComponent from '@/components/sidebar/LeftSideBarComponent.vue';   
import RightSideBarComponent from "@/components/sidebar/RightSideBarComponent.vue";
import SignInModal from '@/components/dialog/signin.vue';
import {sessionCheck} from '@/actions/auth';
import Cookies from 'js-cookie'

const config = useRuntimeConfig();
const not = useQuasar();
const store = useStore();
const route = useRoute();
const router = useRouter();

onBeforeMount(()=>{
    if(Cookies.get('token'))
        sessionCheck(store, router);
})

watch(
    ()=>store.state.notification,
    ()=>{not.notify({
            message: store.state.notification.type,
            caption: store.state.notification.message,
            icon: store.state.notification.type == 'Success'?'done':'info',
            iconColor: store.state.notification.type == 'Success'?'green':'red',
            color: 'white',
            textColor: 'dark',
            position: 'top-right',
            progress:true,
            multiLine: true,
            timeout: 1500,}) 
});

</script>

<template>
    <q-layout view="hHh LpR LFf">
        <!-- Header -->
        <HeaderComponent />
        <!-- SideBar -->
        <LeftSideBarComponent />
        <RightSideBarComponent />
        
        <!-- Container -->
        <q-page-container class="bg-[#0d131c]">
            <NuxtPage />
            <!-- <div
                class="text-sm font-normal text-center p-3"
                :class="store.state.isLogin&&'sm:pb-3 pb-[120px]'"
                style="background-color: #151515; color: #7d8396;"
                >Copyright 2023 Sentiment Analysis
            </div> -->
        </q-page-container> 
        <SignInModal />
    </q-layout>
</template>
