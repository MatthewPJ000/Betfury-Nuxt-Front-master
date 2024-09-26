<template>
    <q-dialog v-model="store.state.onLogin" @hide="() => store.commit('handleOnLogin', false)">
        <div class="bg-[#161f2c] flex w-[700px] p-4 text-gray-400">
            <div class="w-[50%] p-3 flex items-center">
                <QImg 
                    alt="logo" 
                    src="/imgs/header/logo.svg"
                />
            </div>
            <div class="w-[50%] p-3">
                <div class="flex justify-between">
                    <div class="flex mb-3 p-1 rounded-full bg-gray-800 w-fit">
                        <p class="cursor-pointer py-1 px-3 rounded-full text-sm hover:text-white font-semibold w-fit"
                        :class="store.state.loginRegister ? 'bg-blue-500 text-white' : 'bg-transparent hover:bg-gray-700'" @click="()=>store.commit('handleLoginRegister', !store.state.loginRegister)">Log In</p>
                        <p class="cursor-pointer py-1 px-3 rounded-full text-sm hover:text-white font-semibold w-fit"
                        :class="store.state.loginRegister ? 'bg-transparent hover:bg-gray-700' : 'bg-blue-500 text-white'" @click="()=>store.commit('handleLoginRegister', !store.state.loginRegister)">sign Up</p>
                    </div>
                    <q-icon name="close" color="gray" size="sm" class="cursor-pointer" @click="() => store.commit('handleOnLogin', false)"/>
                </div>
                <div class="w-full">
                    <q-input v-if="!store.state.loginRegister" class="my-3" outlined v-model="username" dense placeholder="Enter your username">
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                    <q-input class="my-3" outlined v-model="email" dense placeholder="Enter your email">
                        <template v-slot:prepend>
                            <q-icon name="email" />
                        </template>
                    </q-input>
                    <q-input class="my-3" outlined v-model="password" dense
                        :type="visibility ? 'text' : 'password'" placeholder="Enter your password">
                        <template v-slot:prepend>
                            <q-icon name="lock" />
                        </template>
                        <template v-slot:append>
                            <q-icon v-if="!visibility" name="remove_red_eye" class="cursor-point" @click="visibility=!visibility" />
                            <q-icon v-if="visibility" name="visibility_off" class="cursor-point" @click="visibility=!visibility" />
                        </template>
                    </q-input>
                    <q-input class="my-3" v-if="!store.state.loginRegister" outlined v-model="pass_confirm" dense
                        :type="visibility ? 'text' : 'password'" placeholder="Confirm password">
                        <template v-slot:prepend>
                            <q-icon name="lock" />
                        </template>
                        <template v-slot:append>
                            <q-icon v-if="password == pass_confirm" name="check" color="green" size="sm" />
                        </template>
                    </q-input>
                    <p v-if="store.state.loginRegister" class="text-underline text-blue text-md cursor-pointer pb-3 text-xs">Forgot Password?</p>
                    <q-btn color="primary" text-color="white" v-if="store.state.loginRegister" label="Log In"
                        class="w-full mb-2 mt-4" @click="()=>onLogin()"/>
                    <q-btn color="primary" text-color="white" v-if="!store.state.loginRegister" label="Sign Up"
                        class="w-full mb-2 mt-4" @click="()=>onRegister()"/>
                </div>
            </div>
        </div>
    </q-dialog>
</template>
<script setup>
import {ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {register, login} from "~~/actions/auth";

const store = useStore();
const router = useRouter();
const email = ref("");
const username = ref("");
const password = ref("");
const pass_confirm = ref("");
const visibility = ref(false);


const onRegister = () => {
    if(password.value == pass_confirm.value && username.value != "" && password.value != "" && email.value != "")
        register({
            username:username.value,
            password: password.value,
            email:email.value
        }, store);
}

const onLogin = () => {
    if(password.value != "" && email.value != "")
        login({
            password: password.value,
            email:email.value
        }, store);
}

</script>