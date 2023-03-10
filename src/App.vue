<template>
  <div class="ide-wrappers" v-if="!isMobile()">
    <JanninScriptTextEditor @clicked="runBuild" :outputTabHeight="outputTabSize" />
    <div class="vertical-line"></div>
    <CppText :text="cppOutput" :outputTabHeight="outputTabSize" @clear="clearCPP" />
  </div>
  <div class="output-wrapper">
    <JanninScriptOutput :text="jsOutput" ref="outputWrapper" />
  </div>

  <div v-if="isMobile()" class="mobile">
    Unfortunately the mobile version of the JanninScript online compiler is not yet supported.
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JanninScriptTextEditor from "./components/JanninScriptTextEditor.vue";
import JanninScriptOutput from "./components/JanninScriptOutput.vue";
import CppText from "./components/CppText.vue";

export default defineComponent({
  name: "App",
  mounted: function () {
    document.title = "JanninScript Online Compiler";

    window.addEventListener("resize", this.handleResize);
    window.addEventListener("onfullscreenchange", this.handleResize);
  },

  unmount: function () {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("onfullscreenchange", this.handleResize);
  },

  data() {
    return {
      cppOutput: "",
      jsOutput: [],
      outputTabSize: 40,
    };
  },

  methods: {
    clearCPP() {
      this.cppOutput = "";
    },

    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
      else return false;
    },

    handleResize() {
      this.$nextTick(() => {
        const refs = this.$refs as any;
        const outputWrapper = refs.outputWrapper.$el as HTMLElement;
        this.outputTabSize = outputWrapper.clientHeight;
      });
    },

    runBuild(value: string) {
      this.cppOutput = value[0];

      const func = new Function(value[1]);

      let outputValue;
      try {
        outputValue = func();
      } catch (e) {
        outputValue = [e + ""];
      }

      this.jsOutput = outputValue;
    },
  },

  watch: {
    jsOutput: function () {
      this.handleResize();
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
}

html {
  overflow-y: hidden;
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
  overflow-y: hidden;
}

.mobile {
  color: white;
  height: 100vh;
  width: 100vw;
}
</style>
