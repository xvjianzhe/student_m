<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import {defineComponent, reactive} from "vue";

export default defineComponent({
  name: 'HomeView',
  components:{
    HelloWorld,
  },
  setup(){
    return {}
  },
  created() {
    this.$log.info('测试')
  }

});


</script>
