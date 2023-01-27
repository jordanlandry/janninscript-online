<template>
  <h1>This is a test component.</h1>
  <p>Here are some props {{ msg }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TestP",
  props: {
    msg: String,
  },
});
</script>
