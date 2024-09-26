<template>
    <q-page class=" text-black">
        <div class="flex">
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import { ref , onBeforeMount } from 'vue';
import {useRoute} from 'vue-router';

const store = useStore();
const route = useRoute();

useHead({
      title: 'games',
      meta: [
        {
          hid: 'games',
          name: 'games',
          content: 'betfury'
        }
      ]
});

</script>