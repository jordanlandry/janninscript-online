<template>
  <div class="wrapper">
    <span v-for="token in formatText(text)" :key="token.key" :class="token.className">
      {{ token.text }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
        key: number;
        text: string;
        className: string;
        index: number;
      }

      // Get words as array
      const words: string[] = [];
      let word = "";

      if (text.length === 0) {
        return [{ key: 0, text: " ", className: "line", index: 0 }];
      }

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
        if (this.operators.has(word)) className = "operator";
        else if (this.keywords.has(word)) className = "keyword";
        else if (this.brackets.has(word)) className = "operator";
        else if (this.punctuation.has(word)) className = "punctuation";
        else if (word === " ") className = "space";
        else if (word === "\n") className = "line";

        tokens.push({
          text: word,
          key: i,
          index: i,
          className,
        });
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

.space {
  margin-left: 9.61px; /* 1 space */
  font-size: 0;
}
</style>
