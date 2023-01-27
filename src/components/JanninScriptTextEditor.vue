import { defineComponent } from "vue";

<template>
  <h1>HELLO!</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "JanninScriptTextEditor",
  props: {
    msg: String,
  },
});
</script>
<style scoped></style>
