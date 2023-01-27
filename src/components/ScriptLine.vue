<template>
  <div class="line" :class="{ 'line-select': activeLine }" @mousedown="updateLine(lineNumber)">
    <div class="line-number">{{ lineNumber }}</div>
    <div class="line-content">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      keywords: {
        for: "operator",
        while: "operator",
        var: "keyword",
        fn: "keyword",
        "+": "operator",
        "=": "operator",
        "-": "operator",
        "*": "operator",
        "/": "operator",
        "<": "operator",
        ">": "operator",
      },
    };
  },

  methods: {
    updateLine(num: number | undefined) {
      this.$emit("setActiveLine", num);
    },
  },

  name: "ScriptLine",
  props: {
    text: String,
    activeLine: Boolean,
    lineNumber: Number,
    setActiveLine: Function,
  },

  computed: {
    console: () => console,
  },
});
</script>

<style scoped>
.line {
  display: flex;
  align-items: center;
  color: white;

  cursor: text;
}

.line-select {
  background-color: #333333;
}

.line-number {
  width: 2rem;
  padding: 2px 0;
  text-align: center;
  color: white;
}

.keyword {
  color: rgb(75, 115, 123) !important;
}

.operator {
  color: rgb(140, 65, 85) !important;
}

.value {
  color: rgb(100, 100, 140);
}

.function {
  color: rgb(100, 150, 115);
}

.grey {
  color: rgb(100, 100, 100);
}
</style>
