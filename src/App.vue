<template>
  <JanninScriptTextEditor @clicked="runBuild" />
  <CppText :text="text" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JanninScriptTextEditor from "./components/JanninScriptTextEditor.vue";
import CppText from "./components/CppText.vue";

export default defineComponent({
  name: "App",
  mounted: function () {
    document.title = "JanninScript Online Compiler";
  },

  data() {
    return {
      text: "",
    };
  },

  methods: {
    runBuild(value: string) {
      this.text = value;
    },
  },

  components: {
    JanninScriptTextEditor,
    CppText,
  },
});
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Source Code Pro", monospace;
}
</style>
