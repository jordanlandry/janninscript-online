<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <JanninScriptTextEditor />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JanninScriptTextEditor from "./components/JanninScriptTextEditor.vue";

export default defineComponent({
  name: "App",
  components: {
    JanninScriptTextEditor,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
