<template>
  <div class="wrapper">
    <div class="header">
      <div>
        <p class="file-name">Build.jannin</p>
      </div>
      <div class="button-wrapper">
        <button class="run-btn" @click="run">Run</button>
      </div>
    </div>

    <div class="text-editor" tabindex="-1">
      <TextCursor :linePosition="linePosition" :activeLine="activeLine" />
      <div v-for="(line, index) in lines" v-bind:key="index * Math.random()">
        <ScriptLine
          :text="line"
          :activeLine="activeLine === index"
          :lineNumber="index"
          @setActiveLine="setActiveLine"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { handleKeybind, preventDefaultKeys } from "@/keybinds";
import { defineComponent } from "vue";
import ScriptLine from "./ScriptLine.vue";
import TextCursor from "./TextCursor.vue";
import compile from "@/janninscript/compiler";

// import handleKeybind from "../keybinds";
// import preventDefaultKeys from "../keybinds";

interface KeyStringObject {
  [key: string]: string;
}

export default defineComponent({
  data() {
    return {
      activeLine: 0,
      linePosition: 0,
      lines: [""],

      // When you use arrow keys, this is the max position to the right it should go based on previous positions
      currentMaxPosition: 0,

      phantomBracket: 0,
    };
  },

  mounted() {
    window.addEventListener("keydown", (e) => this.handleKeydown(e));
  },

  unmounted() {
    window.removeEventListener("keydown", (e) => this.handleKeydown(e));
  },

  emits: ["clicked"],
  methods: {
    run() {
      const cpp = compile(this.lines);
      this.$emit("clicked", cpp);
    },

    setActiveLine(line: number) {
      this.linePosition = Math.min(this.currentMaxPosition, this.lines[line].length);
      this.activeLine = line;
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

      // If the key is "Backspace" for example, then the next char won't be NaN
      const valid = isNaN(key.charCodeAt(1)) && key.charCodeAt(0);

      // Prevent default
      if (e.ctrlKey) {
        if (preventDefaultKeys.ctrl.has(key)) e.preventDefault();
      } else if (preventDefaultKeys.normal.has(key)) e.preventDefault();

      // --- Handle Bracket AutoComplete --- \\
      // If the next char is a closing bracket and you have a phantom bracket, then move the position over instead of adding a new bracket
      if (key === "}" || key === ")" || key === "]") {
        if (!(this.lines[this.activeLine][this.linePosition] === key && this.phantomBracket)) {
          this.lines[this.activeLine] = this.spliceSlice(this.lines[this.activeLine], this.linePosition, 0, key);
          this.linePosition++;
          return;
        }

        this.linePosition++;
        this.phantomBracket--;

        return; // Prevent the extra bracket from being added
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

      if (key === "[") {
        this.lines[this.activeLine] += "]";
        this.phantomBracket++;
      }

      // If it's a valid key type it on the screen, else check for keybinds
      if (!valid) {
        const newProps = handleKeybind(e, {
          lines: this.lines,
          activeLine: this.activeLine,
          linePosition: this.linePosition,
          phantomBracket: this.phantomBracket,
          currentMaxPosition: this.currentMaxPosition,
        });

        this.lines = newProps?.lines ?? this.lines;
        this.activeLine = newProps?.activeLine ?? this.activeLine;
        this.linePosition = newProps?.linePosition ?? this.linePosition;
        this.phantomBracket = newProps?.phantomBracket ?? this.phantomBracket;
        this.currentMaxPosition = newProps?.currentMaxPosition ?? this.currentMaxPosition;
      } else {
        this.currentMaxPosition = this.linePosition + 1;

        // Add the key to the line
        this.lines[this.activeLine] = this.spliceSlice(this.lines[this.activeLine], this.linePosition, 0, key);
        this.linePosition += 1;
      }
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
.wrapper {
  width: 100%;
  height: 100%;

  flex: 1;
}

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
  user-select: none;

  font-size: 16px;
}
</style>
