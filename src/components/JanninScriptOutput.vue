<template>
  <div class="wrapper">
    <p>Output</p>
    <div class="output">
      <p v-for="line in format(text)" :key="line.key">> {{ line.text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import nextId from "@/helpers/nextId";
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    format(text: string) {
      interface returnType {
        key: number;
        text: string;
      }
      [];

      const lines = text.split("\n").map((line) => ({ text: line, key: nextId() }));
      return lines;
    },
  },

  name: "JanninScriptOutput",

  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
p {
  margin: 0;
}

.wrapper {
  color: white;
  border: 1px solid white;
  background-color: rgb(51, 51, 51);
  padding: 0 10px;
  position: fixed;
  bottom: 0;
  width: calc(100% - 22px); /* subtract padding and border */

  max-height: 50vh;
  overflow-y: auto;
  z-index: 1;
}

.output {
  padding: 2px;
}
</style>
