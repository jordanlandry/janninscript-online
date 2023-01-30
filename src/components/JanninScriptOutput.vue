<template>
  <div class="wrapper">
    <p>Output</p>
    <div class="output">
      <p v-for="line in format(text)" :key="line.key">
        <span class="chevron-right"></span>
        {{ line.text }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import nextId from "@/helpers/nextId";
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    format(text: string[]) {
      interface returnType {
        key: number;
        text: string;
      }
      [];

      const lines = text.map((line) => ({ text: line, key: nextId() }));
      return lines;
    },
  },

  name: "JanninScriptOutput",

  props: {
    text: {
      type: Array as () => string[],
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
  /* border: 1px solid white; */
  background-color: rgb(51, 51, 51);
  padding: 0.5rem 1rem;
  position: fixed;
  bottom: 0;
  width: calc(100% - 1rem); /* subtract padding */

  max-height: 50vh;
  overflow-y: auto;
  z-index: 1;

  display: block;
}

.output {
  padding: 2px;
}
.chevron-right {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid white;
  margin-right: 5px;
}
</style>
