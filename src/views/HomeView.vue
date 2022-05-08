<template>
  <div class="common-layout">
    <el-container>
      <el-header ><div id="header"></div></el-header>
      <el-container>
        <el-aside width="200px"><MainMenu/></el-aside>
        <el-container>
          <el-main>Main
          <el-button @click="sendMail">测试token</el-button>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">

import {defineComponent, reactive} from "vue";
import MainMenu from "@/components/MainMenu.vue";
import store from "@/store";
import {useStore} from "vuex";
import logger from "@/log/baselog";
import {AuthSendMailCode} from "@/api/auth";
import {GetDictType} from "@/api/sys";

export default defineComponent({
  name: 'HomeView',
  components:{
    MainMenu

  },
  setup(){
    const sendMail = async ()=> {
      return await GetDictType()
    };

    const store = useStore();
    logger.info(store.getters.isLogin)
    return {
      sendMail
    }
  },
  created() {
    this.$log.info('测试')
  },


});


</script>

<style scoped>
#header {
  width: 100%;
  height: 100%;
  background-color: #42b983;
}
.common-layout{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>