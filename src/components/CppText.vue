<template>
  <div class="wrapper">
    <div class="header">
      <div>
        <p class="file-name">C++ Output</p>
      </div>
      <div class="button-wrapper">
        <button class="run-btn" @click="clear">Clear</button>
      </div>
    </div>
    <div v-for="(line, index) in formatText(text)" :key="index">
      <CppLine :text="line" :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CppLine from "./CppLine.vue";

export default defineComponent({
  name: "CppText",

  methods: {
    formatText(text: string) {
      const lines: string[] = text.split("\n");
      return lines;
    },

    clear() {
      // this.text = "";

      console.log("asdasd");
    },
  },

  props: {
    text: {
      type: String,
      required: true,
    },
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
}

.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border: 1px solid grey;
  background-color: #333333;
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
