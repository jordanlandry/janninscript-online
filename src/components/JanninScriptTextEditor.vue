<template>
  <div class="header">
    <div>
      <p class="file-name">Build.jannin</p>
    </div>
    <div class="button-wrapper">
      <button class="run-btn">Run</button>
    </div>
  </div>

  <div class="text-editor">
    <!-- <div class="line" :class="{ 'line-select': activeLine === 1 }" @click="setActiveLine(1)"> -->
    <ScriptLine text="Hello" :activeLine="activeLine === 1" :lineNumber="1" @setActiveLine="setActiveLine" />
    <ScriptLine text="Hello" :activeLine="activeLine === 2" :lineNumber="2" @setActiveLine="setActiveLine" />
    <ScriptLine text="Hello" :activeLine="activeLine === 3" :lineNumber="3" @setActiveLine="setActiveLine" />
    <ScriptLine text="Hello" :activeLine="activeLine === 4" :lineNumber="4" @setActiveLine="setActiveLine" />
    <ScriptLine text="Hello" :activeLine="activeLine === 5" :lineNumber="5" @setActiveLine="setActiveLine" />

    <!-- <div class="line-number">1</div>
      <div class="line-content">
        <span class="operator">for (</span>

        <span class="keyword">var </span>
        <span class="variable"> i</span>
        <span class="operator"> = </span>
        <span class="value"> 0</span>
        <span class="grey">; </span>
        <span class="variable"> i</span>
        <span class="operator">{{ " < " }}</span>
        <span class="value"> 10</span>
        <span class="grey">; </span>
        <span class="variable"> i</span>
        <span class="operator">++</span>
        <span class="operator">)</span>

        <span class="grey"> {</span>
      </div>
    </div>
    <div class="line" :class="{ 'line-select': activeLine === 2 }" @click="setActiveLine(2)">
      <div class="line-number">2</div>
      <div class="line-content">
        <span class="variable">console.</span>
        <span class="function">log</span>
        <span class="operator">(</span>
        <span class="variable">i</span>
        <span class="operator">)</span>
        <span class="grey">;</span>
      </div>
    </div>

    <div class="line" :class="{ 'line-select': activeLine === 3 }" @mousedown="setActiveLine(3)">
      <div class="line-number">3</div>
      <div class="line-content">
        <span class="grey">}</span>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScriptLine from "./ScriptLine.vue";

export default defineComponent({
  data() {
    return {
      activeLine: 0,
    };
  },

  methods: {
    setActiveLine(line: number) {
      this.activeLine = line;
    },
    increment() {
      this.activeLine += 1;
    },
    decrement() {
      this.activeLine -= 1;
    },
  },

  components: {
    ScriptLine,
  },
  name: "JanninScriptTextEditor",
  props: {
    msg: String,
  },
});
</script>

<style scoped>
.header {
  display: flex;
}

.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border: 1px solid grey;
  background-color: #333333;
}

.run-btn {
  background-color: #0055ff;
  border: none;
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
}

.file-name {
  height: 100%;
  padding: 0 1rem;
  margin: 0;
  display: flex;
  align-items: center;

  color: white;
  background-color: rgb(34, 34, 34);
}

.text-editor {
  background-color: rgb(34, 34, 34);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  user-select: none;
}
</style>
