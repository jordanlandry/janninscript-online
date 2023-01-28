<template>
  <div
    class="cursor"
    :style="{
      position: 'absolute',
      top: activeLine * lineHeight + headerHeight + 'px',
      left: (linePosition + 1) * letterSize + lineNumberWidth + 'px',
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextCursor",

  data() {
    return {
      // All in px
      lineHeight: 24,
      headerHeight: 52,
      letterSize: 9.62,
      lineNumberWidth: 24,
    };
  },

  props: {
    activeLine: { type: Number, required: true },
    linePosition: { type: Number, required: true },
  },
});
</script>

<style scoped>
.cursor {
  position: absolute;
  width: 1px;
  height: 1.5rem;
  background-color: #fff;
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
