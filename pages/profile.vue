<template>
  <q-page class="relative w-[90%] sm:w-[80%] mx-auto">
    <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 w-full pt-5">

      <div class="flex flex-col justify-center col-span-1 rounded-lg w-full bg-gray-800 h-fit">
        <QImg :src="`${baseURL}/${store.state.User.avatar}`" class="rounded-full w-[60%] ml-[20%] mt-[10%]" />
        <q-btn label="Change Avatar" no-caps color="primary" class="w-[60%] mx-auto my-5" />
        <q-input dense outlined v-model="new_username" :placeholder="store.state.User.username" class="w-[60%] mx-auto"/>
        <q-btn label="Change Username" no-caps color="primary" class="w-[60%] mx-auto my-5" @click="onChangeUsername()"/>
      </div>

      <div class="lg:col-span-2 sm:col-span-1">

        <div class="w-full p-5 rounded-lg bg-gray-800 mb-5">
          <p class="text-[20px] font-bold">Password</p>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 relative">
            <div class="col-span-1 relative h-full">
              <p class="text-gray-400 mb-1 px-2">Currenct Password</p>
              <q-input outlined dense v-model="current_password" :type="current_pass_visibility ? 'text' : 'password'">
                <template v-slot:append>
                  <q-icon :name="current_pass_visibility ? 'visibility_off' : 'visibility'" class="hover:text-blue-500"
                    @click="current_pass_visibility = !current_pass_visibility" />
                </template>
              </q-input>
              <q-btn label="Update Password" no-caps color="primary" class="lg:!block hidden absolute bottom-0 w-full" @click="onChangePassword()"/>
            </div>
            <div class="col-span-1">
              <p class="text-gray-400 mb-1 px-2">New Password</p>
              <q-input outlined dense v-model="new_password" :type="new_pass_visibility ? 'text' : 'password'">
                <template v-slot:append>
                  <q-icon :name="new_pass_visibility ? 'visibility_off' : 'visibility'" class="hover:text-blue-500"
                  @click="new_pass_visibility = !new_pass_visibility" />
                </template>
              </q-input>
              <p class="text-gray-400 mb-1 mt-3 px-2">Conform Password</p>
              <q-input outlined dense v-model="confirm_password" :type="new_pass_visibility ? 'text' : 'password'">
                <template v-slot:append>
                  <q-icon v-if="confirm_password == new_password" name="check" color="green" />
                </template>
              </q-input>
              <q-btn label="Update Password" no-caps color="primary" class="lg:hidden mt-4 w-full" @click="onChangePassword()"/>
            </div>
          </div>
        </div>

        <div class="w-full p-5 rounded-lg bg-gray-800">
          <p class="text-[20px] font-bold">Email</p>
          <p class="text-gray-300">Set the email to have access to your account anytime.</p>
          <p class="text-gray-300">Use this email to open the platform on any device.</p>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 relative mt-3">
            <div class="col-span-1 relative h-full">
              <div class="flex justify-end px-2">
                <p class="mb-1 bg-green-500 px-2 rounded-full italic">verified</p>
              </div>
              <q-input outlined dense readonly v-model="store.state.User.email" type="text">
                <template v-slot:append>
                  <q-icon name="drive_file_rename_outline" :class="email_editable ? 'text-blue-500' : ''"
                    @click="email_editable = !email_editable" />
                </template>
              </q-input>
              <q-btn label="Update Email" no-caps color="primary" class="absolute bottom-0 w-full lg:!block hidden" @click="onChangeEmail()"/>
            </div>
            <div class="col-span-1">
              <p class="text-gray-400 mb-1 px-2">New Email Address</p>
              <q-input outlined dense v-model="new_email" type="text" :disable="!email_editable"/>
              <p class="text-gray-400 mb-1 mt-3 px-2">Enter Your Password</p>
              <q-input outlined dense v-model="mail_password" :type="email_pass_visibility ? 'text' : 'password'" :disable="!email_editable">
                <template v-slot:append>
                  <q-icon :name="email_pass_visibility ? 'visibility_off' : 'visibility'" class="hover:text-blue-500"
                    @click="email_pass_visibility = !email_pass_visibility" />
                </template>
              </q-input>
              <q-btn label="Update Email" no-caps color="primary" class="w-full mt-4 lg:hidden" @click="onChangeEmail()"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { baseURL } from '@/utils/Axios';
import { changePassword, changeEmail, changeUsername, changeAvatar } from "@/actions/user";

const store = useStore();
const router = useRouter();

const current_password = ref("");
const new_password = ref("");
const confirm_password = ref("");
const new_pass_visibility = ref(false);
const current_pass_visibility = ref(false);
const new_username = ref("");
const new_email = ref("");
const mail_password = ref("");
const email_editable = ref(false);
const email_pass_visibility = ref(false);
const pass_loading_visible = ref(false);
const email_loading_visible = ref(false);
const avatar_loading_visible = ref(false);



const onChangePassword = () => {
  if(current_password.value == ""){
    store.commit('handleNotification',{type:'Error',message: "Input current Password."});
    return;
  }
  if(new_password.value == ""){
    store.commit('handleNotification',{type:'Error',message: "Input New Password."});
    return;
  }
  if(confirm_password.value == ""){
    store.commit('handleNotification',{type:'Error',message: "Input Confirm Password"});
    return;
  }
  if(new_password.value != confirm_password.value){
    store.commit('handleNotification',{type:'Error',message: "Confirm Password Doesn't Match."});
    return;
  }
  changePassword(current_password.value, new_password.value, store, router);
  current_password.value = "";
  new_password.value = "";
  confirm_password.value = "";
}

const onChangeEmail = () => {
  if(new_email.value == ""){
    store.commit('handleNotification',{type:'Error',message: "Input New Email Address."});
    return;
  }
  if(mail_password.value == ""){
    store.commit('handleNotification',{type:'Error',message: "input Current Password."});
    return;
  }
  changeEmail(new_email.value, mail_password.value, store, router);
  new_email.value = "";
  mail_password.value = "";
  email_editable.value = false;
}

const onChangeUsername = () => {
  if(new_username.value == ""){
    store.commit('handleNotification',{type:'Error', message: "Input New Username."});
    return;
  }
  changeUsername(new_username.value, store, router);
  new_username.value = "";
}


useHead({
  title: 'profile',
  meta: [
    {
      hid: 'profile',
      name: 'profile',
      content: 'betfury'
    }
  ]
});

</script>