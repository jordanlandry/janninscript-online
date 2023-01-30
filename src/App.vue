<template>
  <div class="ide-wrappers" :style="{ marginBottom: outputTabSize + 'px' }">
    <JanninScriptTextEditor @clicked="runBuild" />
    <div class="vertical-line"></div>
    <CppText :text="cppOutput" />
  </div>
  <div class="output-wrapper">
    <JanninScriptOutput :text="jsOutput" ref="outputWrapper" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JanninScriptTextEditor from "./components/JanninScriptTextEditor.vue";
import JanninScriptOutput from "./components/JanninScriptOutput.vue";
import CppText from "./components/CppText.vue";
import { COMPLETIONSTATEMENT_TYPES } from "@babel/types";

export default defineComponent({
  name: "App",
  mounted: function () {
    document.title = "JanninScript Online Compiler";
  },

  data() {
    return {
      cppOutput: "",
      jsOutput: [],
      outputTabSize: 100,
    };
  },

  watch: {
    jsOutput: function () {
      this.$nextTick(() => {
        const refs = this.$refs as any;
        const outputWrapper = refs.outputWrapper.$el as HTMLElement;
        this.outputTabSize = outputWrapper.clientHeight;
      });
    },
  },

  methods: {
    runBuild(value: string) {
      this.cppOutput = value[0];

      const func = new Function(value[1]);

      let a;
      try {
        a = func();
      } catch (e) {
        a = [e + ""];
      }

      this.jsOutput = a;
    },
  },

  components: {
    JanninScriptTextEditor,
    CppText,
    JanninScriptOutput,
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
  z-index: 1;
}

.ide-wrappers {
  display: flex;
}
</style>
