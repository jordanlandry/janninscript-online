<template>
  <div class="line" :class="{ 'line-select': activeLine }" @mousedown="updateLine(lineNumber)">
    <div class="line-number">{{ lineNumber }}</div>
    <div class="line-content"></div>
    <div class="line-content">
      <span v-for="token in parseLine(text)" :class="token.className" :key="token.key">
        {{ token.text }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { COMPARISON_BINARY_OPERATORS } from "@babel/types";
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
        ";": "grey",
        "{": "grey",
        "}": "grey",
        "(": "operator",
        ")": "operator",
        ",": "grey",
      },
    };
  },

  methods: {
    updateLine(num: number | undefined) {
      this.$emit("setActiveLine", num);
    },

    parseLine(text: string | undefined) {
      interface Token {
        key: number;
        text: string;
        className: string;
      }

      const res: Token[] = [];
      let currentWord = "";
      for (let i = 0; i < text!.length; i++) {
        const char = text![i];

        // Make the whole line grey if it starts with a comment
        if (i < text!.length - 1) {
          const nextChar = text![i + 1];
          if (char === "/" && nextChar === "/") {
            res.push({
              key: i,
              text: text!.slice(i),
              className: "grey",
            });
          }
        }

        // End of the word
        if (
          char === " " ||
          char === ";" ||
          char === "(" ||
          char === ")" ||
          char === "+" ||
          char === "{" ||
          char === "}"
        ) {
          // Get className
          let className = "variable";

          // isNaN because if val is 0, it will think it's false if I just do "if (parseInt)"
          if (!isNaN(parseInt(currentWord))) className = "value";
          else if (this.keywords[currentWord]) className = this.keywords[currentWord];

          res.push({
            key: i,
            text: currentWord,
            className: className,
          });

          currentWord = "";

          // Add the operator
          res.push({
            key: i,
            text: char,
            className: this.keywords[char] || "variable",
          });
        } else currentWord += char; // Continue the word
      }

      if (currentWord.length > 0) {
        res.push({
          key: text!.length,
          text: currentWord,
          className: this.keywords[currentWord] || "variable",
        });
      }

      return res;
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
