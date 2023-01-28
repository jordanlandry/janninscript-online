<template>
  <div class="header">
    <div>
      <p class="file-name">Build.jannin</p>
    </div>
    <div class="button-wrapper">
      <button class="run-btn">Run</button>
    </div>
  </div>

  <div class="text-editor" @keydown="(e) => handleKeydown(e)" tabindex="-1">
    <div v-for="(line, index) in lines" :key="index">
      <ScriptLine :text="line" :activeLine="activeLine === index" :lineNumber="index" @setActiveLine="setActiveLine" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScriptLine from "./ScriptLine.vue";

interface KeyStringObject {
  [key: string]: string;
}

export default defineComponent({
  data() {
    return {
      activeLine: 0,
      lines: [""],
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

    handleKeydown(e: KeyboardEvent) {
      const { key } = e;

      e.preventDefault();

      // If the key is "Backspace" for example, then the next char won't be NaN
      const valid = isNaN(key.charCodeAt(1)) && key.charCodeAt(0);

      if (valid) this.lines[this.activeLine] += key;

      // Check for special keys
      if (key === "Enter") {
        this.lines.push("");
        this.activeLine = Math.min(this.activeLine + 1, this.lines.length - 1);
      } else if (key === "ArrowDown") this.activeLine = Math.min(this.activeLine + 1, this.lines.length - 1);
      else if (key === "ArrowUp") this.activeLine = Math.max(this.activeLine - 1, 0);
      else if (key === "Backspace") {
        this.lines[this.activeLine] = this.lines[this.activeLine].slice(0, -1);

        // If the line is empty, then delete it
        if (this.lines[this.activeLine] === "") {
          if (this.lines.length > 1) {
            this.lines.splice(this.activeLine, 1);
            this.activeLine = Math.max(this.activeLine - 1, 0);
          }
        }
      } else if (key === "Tab") this.lines[this.activeLine] += "    ";
    },
  },

  components: {
    ScriptLine,
  },

  computed: {
    console: () => console,
  },

  name: "JanninScriptTextEditor",
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

  font-size: 16px;
}
</style>
