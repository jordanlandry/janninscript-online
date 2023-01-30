<template>
  <div
    class="cursor"
    :style="{
      position: 'absolute',
      top: activeLine * lineHeight + headerHeight + 'px',
      left: (linePosition + 1) * letterSize + lineNumberWidth + 'px',
      opacity: counter >= maxCounter ? 0 : 1,
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextCursor",

  watch: {
    counter: function (newVal: number) {
      if (newVal >= this.maxCounter * 2) this.counter = 0;
    },
  },

  methods: {
    resetBlink() {
      this.counter = 0;
    },
  },

  mounted() {
    window.addEventListener("keydown", this.resetBlink);

    this.interval = setInterval(() => {
      this.counter += this.maxCounter / 2;
    }, this.maxCounter / 2);
  },

  unmounted() {
    window.addEventListener("keydown", this.resetBlink);

    clearInterval(this.interval);
  },

  data() {
    return {
      lineHeight: 24,
      headerHeight: 52,
      letterSize: 9.61,
      lineNumberWidth: 24,

      counter: 0,
      maxCounter: 500,

      interval: 0,
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
}
</style>
