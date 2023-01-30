<template>
  <div class="ide-wrappers">
    <JanninScriptTextEditor @clicked="runBuild" />
    <div class="vertical-line"></div>
    <CppText :text="text" />
  </div>
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
  background-color: rgb(34, 34, 34);
  min-height: 100vh;
}

.vertical-line {
  border-left: 2px solid rgb(100, 100, 100);
  height: 100%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
}

.ide-wrappers {
  display: flex;
}
</style>
