<template>
  <div class="header">
    <div>
      <p class="file-name">Build.jannin</p>
    </div>
    <div class="button-wrapper">
      <button class="run-btn">Run</button>
    </div>
  </div>

  <div class="text-editor" tabindex="-1">
    <TextCursor :linePosition="linePosition" :activeLine="activeLine" />
    <div v-for="(line, index) in lines" v-bind:key="index * Math.random()">
      <ScriptLine :text="line" :activeLine="activeLine === index" :lineNumber="index" @setActiveLine="setActiveLine" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScriptLine from "./ScriptLine.vue";
import TextCursor from "./TextCursor.vue";

interface KeyStringObject {
  [key: string]: string;
}

export default defineComponent({
  data() {
    return {
      activeLine: 0,
      linePosition: 0,
      lines: [""],

      phantomBracket: 0,
    };
  },

  mounted() {
    window.addEventListener("keydown", (e) => this.handleKeydown(e));
  },

  unmounted() {
    window.removeEventListener("keydown", (e) => this.handleKeydown(e));
  },

  methods: {
    setActiveLine(line: number) {
      this.activeLine = line;
    },

    handleBackspace() {
      const line = this.lines[this.activeLine];

      // Filter out the character at the line position, basically running
      // line.filter((char:string, index:number) => index !== this.linePosition); on a string
      let newStr = "";
      for (let i = 0; i < line.length; i++) {
        if (i === this.linePosition - 1) continue;

        newStr += line[i];
      }

      this.lines[this.activeLine] = newStr;

      // If the line position is 0, we need to merge the current line with the previous line
      if (this.linePosition === 0) {
        if (this.activeLine === 0) return;

        const prevLength = this.lines[this.activeLine - 1].length;

        this.lines[this.activeLine - 1] += this.lines[this.activeLine];
        this.lines.splice(this.activeLine, 1);

        this.linePosition = prevLength;

        this.activeLine--;
      } else this.linePosition--;
    },

    handleDelete() {
      const line = this.lines[this.activeLine];
      let newStr = "";
      for (let i = 0; i < line.length; i++) {
        if (i === this.linePosition) continue;

        newStr += line[i];
      }

      this.lines[this.activeLine] = newStr;

      // If the line is empty, then delete it
      if (this.lines[this.activeLine] === "") {
        if (this.lines.length > 1) {
          this.lines.splice(this.activeLine, 1);
          this.activeLine = Math.max(this.activeLine - 1, 0);
        }
      }
    },

    spliceSlice(str: string, index: number, count: number, add: string) {
      if (index < 0) {
        index = str.length + index;
        if (index < 0) index = 0;
      }

      return str.slice(0, index) + (add || "") + str.slice(index + count);
    },

    handleKeydown(e: KeyboardEvent) {
      const { key } = e;

      e.preventDefault();

      // If the key is "Backspace" for example, then the next char won't be NaN
      const valid = isNaN(key.charCodeAt(1)) && key.charCodeAt(0);

      if (key === "}" || key === ")") {
        // If the next char is a closing bracket and you have a phantom bracket, then move the position over instead of adding a new bracket
        if (!(this.lines[this.activeLine][this.linePosition] === key && this.phantomBracket)) {
          this.lines[this.activeLine] = this.spliceSlice(this.lines[this.activeLine], this.linePosition, 0, key);
          this.linePosition++;
          return;
        }

        this.linePosition++;
        this.phantomBracket--;

        return; // Prevent the extra bracket from being added
      }

      if (valid) {
        // this.lines[this.activeLine] += key;
        this.lines[this.activeLine] = this.spliceSlice(this.lines[this.activeLine], this.linePosition, 0, key);
        this.linePosition += 1;
      }

      // Add extra brackets
      if (key === "(") {
        this.lines[this.activeLine] += ")";
        this.phantomBracket++;
      }

      if (key === "{") {
        this.lines[this.activeLine] += "}";
        this.phantomBracket++;
      }

      // Check for special keys
      if (key === "Enter") {
        // this.lines.splice(this.activeLine + 1, 0, "");

        // Move everything to the right of the linePosition to the next line
        const newLine = this.lines[this.activeLine].slice(this.linePosition);
        this.lines[this.activeLine] = this.lines[this.activeLine].slice(0, this.linePosition);

        this.lines.splice(this.activeLine + 1, 0, newLine);

        this.linePosition = 0;
        this.activeLine = Math.min(this.activeLine + 1, this.lines.length - 1);
      } else if (key === "ArrowDown") {
        this.activeLine = Math.min(this.activeLine + 1, this.lines.length - 1);
        this.linePosition = Math.min(this.linePosition, this.lines[this.activeLine].length); // Don't go past the end of the line
      } else if (key === "ArrowUp") {
        this.activeLine = Math.max(this.activeLine - 1, 0);
        this.linePosition = Math.min(this.linePosition, this.lines[this.activeLine].length); // Prevents the cursor from going past the end of the line
      } else if (key === "ArrowLeft") this.linePosition = Math.max(this.linePosition - 1, 0);
      else if (key === "ArrowRight")
        this.linePosition = Math.min(this.linePosition + 1, this.lines[this.activeLine].length);
      else if (key === "Backspace") this.handleBackspace();
      else if (key === "Delete") this.handleDelete();
      else if (key === "Tab") {
        this.lines[this.activeLine] = this.spliceSlice(this.lines[this.activeLine], this.linePosition, 0, "    ");
        this.linePosition += 4;
      } else if (key === "Home") this.linePosition = 0;
      else if (key === "End") this.linePosition = this.lines[this.activeLine].length;
    },
  },

  components: {
    ScriptLine,
    TextCursor,
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
