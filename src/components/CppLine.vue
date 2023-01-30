<template>
  <div>
    <div class="wrapper">
      <span v-for="token in formatText(text)" :key="token.key" :class="token.className">
        {{ token.text }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import nextId from "../helpers/nextId";

export default defineComponent({
  name: "CppLine",

  // Keywords: blue, operators: red, values: green, comments: grey, spaces: white
  data() {
    return {
      keywords: new Set([
        "auto",
        "break",
        "case",
        "char",
        "class",
        "continue",
        "default",
        "double",
        "else",
        "enum",
        "extern",
        "float",
        "for",
        "goto",
        "int",
        "long",
        "register",
        "return",
        "short",
        "signed",
        "sizeof",
        "static",
        "struct",
        "switch",
        "typedef",
        "union",
        "unsigned",
        "void",
        "volatile",
        "vector",
      ]),

      operators: new Set([
        "+",
        "-",
        "*",
        "/",
        "%",
        "++",
        "--",
        "==",
        "!=",
        ">",
        "<",
        ">=",
        "<=",
        "&&",
        "||",
        "!",
        "&",
        "|",
        "^",
        "~",
        "<<",
        ">>",
        "=",
        "+=",
        "-=",
        "*=",
        "/=",
        "%=",
        "&=",
        "|=",
        "^=",
        "<<=",
        ">>=",
        "const",
        "for",
        "while",
        "if",
        "else",
        "return",
        "new",
        "public",
        "private",
        "protected",
        "#include",
      ]),

      brackets: new Set(["(", ")", "{", "}", "[", "]"]),
      punctuation: new Set([";", ",", ".", ":", "?"]),
      endOfWord: new Set([
        " ",
        ";",
        "\t",
        "\n",
        "(",
        ")",
        "{",
        "}",
        "[",
        "]",
        ",",
        ".",
        ":",
        "?",
        "-",
        "+",
        "=",
        ":",
        "<",
        ">",
        "&",
        "|",
        "^",
        "~",
        "!",
        "*",
        "/",
        "%",
      ]),
    };
  },

  methods: {
    formatText(text: string) {
      let index = 0;
      interface Token {
        text: string;
        className: string;
        key: number;
      }

      // Get words as array
      const words: string[] = [];
      let word = "";

      if (text.length === 0) return [{ text: " ", className: "line", key: nextId() }];

      for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (this.endOfWord.has(char)) {
          words.push(word);
          word = "";
          words.push(char);
        } else word += text[i];
      }

      // Push the last word
      words.push(word);

      // Go through the words to give classNames to them
      const tokens: Token[] = [];

      words.forEach((word, i) => {
        let className = "variable";
        if (word === " ") tokens.push({ text: " ", className: "space", key: nextId() });
        else if (word === "\t") tokens.push({ text: "&nbsp&nbsp&nbsp&nbsp", className: "space", key: nextId() });
        else if (this.operators.has(word)) className = "operator";
        else if (this.keywords.has(word)) className = "keyword";
        else if (this.brackets.has(word)) className = "operator";
        else if (this.punctuation.has(word)) className = "punctuation";
        else if (word === "\n") className = "line";

        tokens.push({ text: word, className, key: nextId() });
      });

      return tokens;
    },
  },

  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.wrapper {
  height: 24px;
  display: flex;
  align-items: center;

  margin-left: 6px;
}

.line {
  display: block;
  height: 24px;
  /* margin-top: 9.61px; */
  width: 100%;
}

.space {
  margin-left: 9.61px; /* 1 space */
  font-size: 0;
}

.variable {
  color: white;
}

.punctuation {
  color: grey;
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
</style>
