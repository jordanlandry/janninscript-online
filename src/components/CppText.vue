<template>
  <div v-for="(line, index) in formatText(text)" :key="index">
    <CppLine :text="line" :key="index" />
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
