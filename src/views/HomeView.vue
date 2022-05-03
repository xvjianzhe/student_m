<template>
  <div class="common-layout">
    <el-container>
      <el-header ><div id="header"></div></el-header>
      <el-container>
        <el-aside width="200px"><MainMenu/></el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">

import {defineComponent, reactive} from "vue";
import MainMenu from "@/components/MainMenu.vue";

export default defineComponent({
  name: 'HomeView',
  components:{
    MainMenu

  },
  setup(){
    return {}
  },
  created() {
    this.$log.info('测试')
  }

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