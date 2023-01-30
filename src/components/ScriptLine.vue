<template>
  <div class="line" :class="{ 'line-select': activeLine }" @mousedown="updateLine(lineNumber)">
    <div class="line-number">{{ lineNumber + 1 }}</div>
    <div class="line-content"></div>
    <div class="line-content">
      <span v-for="token in parseLine(text)" :class="token.className" :key="token.key">
        {{ token.text }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface StringKeyObject {
  [key: string]: string;
}

export default defineComponent({
  data() {
    return {
      keywords: {
        for: "operator",
        while: "operator",
        var: "keyword",
        fn: "keyword",
        new: "keyword",
        class: "keyword",
        if: "operator",
        else: "operator",
        return: "keyword",
        "+": "operator",
        "=": "operator",
        "-": "operator",
        "*": "operator",
        "/": "operator",
        "<": "operator",
        ">": "operator",
        ";": "grey",
        "{": "operator",
        "}": "operator",
        "(": "keyword",
        ")": "keyword",
        "[": "value",
        "]": "value",
        ",": "grey",
        " ": "space",
      } as StringKeyObject,
    };
  },

  methods: {
    updateLine(num: number | undefined) {
      this.$emit("setActiveLine", num);
    },

    parseLine(text: string | undefined) {
      let index = 0;
      interface Token {
        key: number;
        text: string;
        className: string;
        index: number;
      }

      const res: Token[] = [];
      let currentWord = "";
      for (let i = 0; i < text!.length; i++) {
        index++;
        const char = text![i];

        // Make the whole line grey if it starts with a comment
        if (i < text!.length - 1) {
          const nextChar = text![i + 1];
          if (char === "/" && nextChar === "/") {
            res.push({
              key: i,
              text: text!.slice(i),
              className: "grey",
              index,
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
          char === "-" ||
          char === "*" ||
          char === "/" ||
          char === "{" ||
          char === "}" ||
          char === '"' ||
          char === "[" ||
          char === "]" ||
          char === ","
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
            index,
          });

          currentWord = "";

          // Add the operator
          res.push({
            key: i,
            text: char,
            className: this.keywords[char] || "variable",
            index,
          });
        } else currentWord += char; // Continue the word
      }

      if (currentWord.length > 0) {
        res.push({
          key: text!.length,
          text: currentWord,
          className: this.keywords[currentWord] || "variable",
          index,
        });
      }

      return res;
    },
  },

  name: "ScriptLine",
  props: {
    text: String,
    activeLine: Boolean,
    lineNumber: { type: Number, required: true },
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
  color: #78dce8;
}

.operator {
  color: #ff6188;
}

.value {
  color: #ab9df2;
}

.function {
  color: #a9dc76;
}

.string {
  color: #ffd866;
}

.grey {
  color: rgb(100, 100, 100);
}

.space {
  margin-left: 9.61px; /* 1 space */
  font-size: 0;
}
</style>
