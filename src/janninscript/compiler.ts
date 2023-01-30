let cppOutput = "";
let jsOutput = "function main() {\n";

function isVectorVar(varNames: string[], name: string) {
  for (let i = 0; i < varNames.length; i++) {
    if (name == varNames[i]) return true;
  }
  return false;
}

function skipSpaces(words: string[], i: number) {
  while (words[i] == " " || words[i] == "\n") i++;
  return i;
}

function skipCertain(words: string[], i: number, toSkip: string) {
  while (words[i] != toSkip) i++;
  return i;
}

function skipTo(words: string[], i: number, toSkip: string) {
  while (words[i] != toSkip) i++;
  return i + 1;
}

// Look for ; before =
function isUndefined(words: string[], i: number) {
  while (words[i] != ";") {
    if (words[i] == "=") return false;
    i++;
  }

  return true;
}

const vectorVariableNames: string[] = [];

function clearBuild() {
  cppOutput = "";
  jsOutput = "function main() {\n";
}

function includeToBuild() {
  cppOutput += "#include <iostream>\n";
  cppOutput += "#include <string>\n";
  cppOutput += "#include <fstream>\n";
  cppOutput += "#include <vector>\n\n";
}

function addFunctions() {
  const MathFunction =
    "const double PI = 3.14159265358979323846\nconst double E = 2.71828182845904523536;\n\nint floor(double x) {\n    return (int) x;\n}\n\nint ceil(double x) {\n    if (x - (int) x == 0) return (int) x;\n    else return (int) x + 1;\n}\n\nint round(double x) {\n    if (x - (int) x >= 0.5) return (int) x + 1;\n    else return (int) x;\n}\n\ndouble round(double x, int decimals) {\n    double multiplier = 1;\n    for (int i = 0; i < decimals; i++) multiplier *= 10;\n    return round(x * multiplier) / multiplier;\n}\n\ndouble abs(double x) {\n    return x < 0 ? -x : x;\n}\n\ndouble square(double x) {\n    return x * x;\n}\n\ndouble pow(double x, double y) {\n    double result = 1;\n    for (int i = 0; i < y; i++) {\n        result *= x;\n    }\n    return result;\n}\n\ndouble log(double x) {\n    return log(x);\n}";

  const PrintFunction =
    '\n\nvoid print() {\n    std::cout << "";\n}\n\ntemplate<typename First, typename ... Strings>\nvoid print(First arg, const Strings&... rest) {\n    std::cout << std::boolalpha << arg  << " ";\n    print(rest...);\n}\n';

  const MathFunctionJS = "const PI = 3.14159265358979323846;const E = 2.71828182845904523536;";

  // const PrintFunctionJS =
  //   'function print() {\n    console.log("");\n}\n\nfunction print(...args) {\n    console.log(...args);\n}\n';

  cppOutput += MathFunction;
  cppOutput += PrintFunction;

  jsOutput += MathFunctionJS;
  // jsOutput += PrintFunctionJS;
}

function addMainFunction() {
  cppOutput += "\nint main() {\n";
}

function endMainFunction() {
  // build << "return 0;" << std::endl;
  // build << "}" << std::endl;

  cppOutput += "    return 0;\n}\n";

  jsOutput += "}\nmain()";
}

// Anything not in a function is added to the main function
function addToBuild(word: string) {
  cppOutput += word;
  jsOutput += word;
}

function addToCpp(word: string) {
  cppOutput += word;
}

function addToJs(word: string) {
  jsOutput += word;
}

function addClasses() {
  const VectorBoolClass =
    "class VectorBool {\npublic:\n    std::vector<bool> data;\n    VectorBool(std::vector<bool> data) {\n        this->data = data;\n    }\n\n    bool operator[](int index) {\n        return data[index];\n    }\n\n};\n\n";
  const VectorDoubleClass =
    "class VectorDouble {\npublic:\n    std::vector<double> data;\n    VectorDouble(std::vector<double> data) {\n        this->data = data;\n    }\n    double operator[](int index) {\n        return data[index];\n    }\n};\n\n";
  const VectorStringClass =
    "class VectorString {\npublic:\n    std::vector<std::string> data;\n    VectorString(std::vector<std::string> data) {\n        this->data = data;\n    }\n    std::string operator[](int index) {\n        return data[index];\n    }\n};\n\n";

  cppOutput += VectorBoolClass;
  cppOutput += VectorDoubleClass;
  cppOutput += VectorStringClass;
}

function handleAddVar(words: string[], i: number) {
  addToBuild("\n    ");

  let j = i + 1;
  j = skipSpaces(words, j);
  const varName = words[j];

  let type = "";

  j = skipSpaces(words, j + 1);
  if (words[j] == ":") {
    j = skipSpaces(words, j + 1);
    type = words[j];
    j = skipSpaces(words, j + 1);
  }

  j = skipCertain(words, j, "=");
  j = skipSpaces(words, j + 1);

  // Handle arrays as vectors
  if (words[j] == "[") {
    if (type == "number") addToCpp("VectorDouble " + varName + ";");
    else if (type == "string") addToCpp("VectorString " + varName + ";");
    else if (type == "bool") addToCpp("VectorBool " + varName + ";");

    vectorVariableNames.push(varName);

    addToCpp("    " + varName + ".value = {\n");
    while (words[j] != "]") {
      j = skipSpaces(words, j + 1);
      if (words[j] != "]") {
        addToBuild(words[j]);
      }
    }

    addToBuild("};\n    ");
  }

  // Not an array
  else {
    const varValue = words[j];
    addToCpp("auto " + varName + "=" + varValue);
  }

  i += j - i;

  return i;
}

function handleAddFn(words: string[], i: number) {
  addToCpp("auto ");
  i = skipSpaces(words, i + 1);
  addToCpp(words[i] + " = []");

  i = skipSpaces(words, i + 1);

  // Add parameters
  addToCpp("(");

  i = skipSpaces(words, i + 1);
  if (words[i] == ")") addToCpp(")");
  else {
    while (words[i] != ")") {
      addToCpp("auto " + words[i]);
      i = skipSpaces(words, i + 1);

      if (words[i] == ")") {
        addToCpp(")");
        break;
      }

      addToCpp(",");
      i = skipSpaces(words, i + 1);
    }
  }

  // Add function body
  addToCpp("\n");

  return i;
}

// Read file line by line and write to build
function readFile(lines: string[]) {
  const line = "";
  const words: string[] = [];

  // while (std::getline(text, line)) {
  // Split line into words

  for (let i = 0; i < lines.length; i++) {
    let word = "";
    for (const x of lines[i]) {
      if (
        x == " " ||
        x == ";" ||
        x == "{" ||
        x == "}" ||
        x == "(" ||
        x == ")" ||
        x == "\n" ||
        x == "[" ||
        x == "]" ||
        x == "," ||
        x == "+" ||
        x == "-" ||
        x == "*" ||
        x == "/" ||
        x == "=" ||
        x == ":"
      ) {
        if (word != "") {
          words.push(word);
          word = "";
        }

        words.push(x);
      } else if (x == ".") {
        words.push(word);
        word = "";
        word += x;
      } else word = word + x;
    }
  }

  // Go through words and write to build
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Add .value because we are using a class
    const addDotValue = isVectorVar(vectorVariableNames, word) && words[i + 1][0] != ".";

    if (word == "var") i = handleAddVar(words, i);
    else if (word == ";") addToCpp(";\n    ");
    else if (word == "{") addToCpp("{\n    ");
    else if (word == "}") addToCpp("};\n    ");
    else if (word == "fn") i = handleAddFn(words, i);
    else if (addDotValue) addToCpp(word + ".value");
    else if (word != "fn") addToCpp(word);
  }
}

export default function compile(lines: string[]) {
  clearBuild();

  includeToBuild();
  addClasses();
  addFunctions();

  addMainFunction();
  readFile(lines);
  endMainFunction();

  return [cppOutput, jsOutput];
}

//     EMSCRIPTEN_KEEPALIVE
//     char* compile(char* text) {
//     // clearBuild();

//     // includeToBuild();
//     // addClasses();
//     // addFunctions();

//     // addMainFunction();
//     // readFile(text);
//     // endMainFunction();

//     // char* c = output.c_str();
//     // return c;

//     return (char*) "ouput";

//     }
// }
