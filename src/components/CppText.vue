<template>
  <div class="wrapper" :style="{ height: height + 'px' }">
    <div class="header">
      <div>
        <p class="file-name">C++ Output</p>
      </div>
      <div class="button-wrapper">
        <label for="include-base">Include Base File</label>
        <input type="checkbox" id="include-base" v-model="toggleShowBase" />
        <button class="run-btn" @click="clear">Clear</button>
      </div>
    </div>
    <div v-for="(line, index) in formatText(totalFile)" :key="index">
      <CppLine :text="line" :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CppLine from "./CppLine.vue";

export default defineComponent({
  name: "CppText",

  data() {
    return {
      toggleShowBase: false,
      baseFile: "",
      file: "",
      totalFile: "",

      height: window.innerHeight - this.$props.outputTabHeight,
    };
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("onfullscreenchange", this.handleResize);
  },

  unmounted() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("onfullscreenchange", this.handleResize);
  },

  watch: {
    toggleShowBase: function (newVal: boolean) {
      if (newVal) this.totalFile = this.baseFile + this.file;
      else this.totalFile = this.file;

      // Now that you're showing the base, you'll have more lines so you need to update the height
      this.handleResize();
    },

    text: function (newVal: string) {
      // Look for "int main()" and add everything before it to the base file
      let currentLine = "";
      for (let i = 0; i < this.text.length; i++) {
        currentLine += this.text[i];

        if (currentLine.includes("int main()")) {
          this.baseFile = this.text.substring(0, i);
          this.file = this.text.substring(i - 9);
          break;
        }
      }

      if (this.toggleShowBase) this.totalFile = this.baseFile + this.file;
      else this.totalFile = this.file;
    },
  },

  // created: function () {},

  methods: {
    handleResize() {
      this.height = window.innerHeight - this.$props.outputTabHeight;
    },

    formatText(text: string) {
      const lines: string[] = text.split("\n");
      return lines;
    },

    clear() {
      // console.warn("Clearing not implemented yet");
      this.$emit("clear");
    },
  },

  props: {
    text: {
      type: String,
      required: true,
    },
    outputTabHeight: { type: Number, required: true },
  },

  components: {
    CppLine,
  },
});
</script>

<style scoped>
.header {
  display: flex;
}
.wrapper {
  flex: 1;

  overflow-y: auto;
}

.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid grey;
  background-color: #333333;
}

.button-wrapper label {
  color: white;
}

.run-btn {
  background-color: transparent;

  border: 1px solid white;
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
</style>
