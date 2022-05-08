<template>
  <router-view/>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent(
    {
      name: "app",
      created(){
        if (sessionStorage.getItem('store')) {
          this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
        }
        const store = this.$store;
        window.addEventListener('beforeunload', ()=> {
          sessionStorage.setItem('store', JSON.stringify(store.state))
        })
      }
    },

);
</script>

<style lang="scss">
body,html{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
