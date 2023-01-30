let cppOutput = "";
let jsOutput = "";

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
}

function includeToBuild() {
  cppOutput += "#include <iostream>\n";
  cppOutput += "#include <string>\n";
  cppOutput += "#include <fstream>\n";
  cppOutput += "#include <vector>\n\n";
}

function addFunctions() {
  const MathFunction =
    "const double PI = 3.14159265358979323846\nconst double E = 2.71828182845904523536;\nint floor(double x) {\n\treturn (int) x;\n}\nint ceil(double x) {\n\tif (x - (int) x == 0) return (int) x;\n\telse return (int) x + 1;\n}\n\nint round(double x) {\n\tif (x - (int) x >= 0.5) return (int) x + 1;\n\telse return (int) x;\n}\n\ndouble round(double x, int decimals) {\n\tdouble multiplier = 1;\n\tfor (int i = 0; i < decimals; i++) multiplier *= 10;\n\treturn round(x * multiplier) / multiplier;\n}\n\ndouble abs(double x) {\n\treturn x < 0 ? -x : x;\n}\n\ndouble square(double x) {\n\treturn x * x;\n}\n\ndouble pow(double x, double y) {\n\tdouble result = 1;\n\tfor (int i = 0; i < y; i++) {\n\tresult *= x;\n}\nreturn result;\n}\n\ndouble log(double x) {\n\treturn log(x);\n}";

  const PrintFunction =
    'void print() {\n    std::cout << "\n";\n}\n\ntemplate<typename First, typename ... Strings>\nvoid print(First arg, const Strings&... rest) {\n    std::cout << std::boolalpha << arg  << " ";\n    print(rest...);\n}\n';

  const MathFunctionJS = "const PI = 3.14159265358979323846;const E = 2.71828182845904523536;";

  const PrintFunctionJS =
    'function print() {\n    console.log("");\n}\n\nfunction print(...args) {\n    console.log(...args);\n}\n';

  cppOutput += MathFunction;
  cppOutput += PrintFunction;

  jsOutput += MathFunctionJS;
  jsOutput += PrintFunctionJS;
}

function addMainFunction() {
  cppOutput += "int main() {\n";
}

function endMainFunction() {
  // build << "return 0;" << std::endl;
  // build << "}" << std::endl;

  cppOutput += "return 0;\n}\n";
}

// Anything not in a function is added to the main function
function addToBuild(word: string) {
  cppOutput += word;
}

function addClasses() {
  const VectorBoolClass =
    "class VectorBool {\npublic:\n    std::vector<bool> data;\n    VectorBool(std::vector<bool> data) {\n        this->data = data;\n    }\n    bool operator[](int index) {\n        return data[index];\n    }\n};\n";
  const VectorDoubleClass =
    "class VectorDouble {\npublic:\n    std::vector<double> data;\n    VectorDouble(std::vector<double> data) {\n        this->data = data;\n    }\n    double operator[](int index) {\n        return data[index];\n    }\n};\n";
  const VectorStringClass =
    "class VectorString {\npublic:\n    std::vector<std::string> data;\n    VectorString(std::vector<std::string> data) {\n        this->data = data;\n    }\n    std::string operator[](int index) {\n        return data[index];\n    }\n};\n";

  cppOutput += VectorBoolClass;
  cppOutput += VectorDoubleClass;
  cppOutput += VectorStringClass;
}

// std::string figureOutType(std::string word) {
//     // Return int for now
//     return "int";
// }

function handleAddVar(words: string[], i: number) {
  addToBuild("\n\t");

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
    if (type == "number") addToBuild("VectorDouble " + varName + ";");
    else if (type == "string") addToBuild("VectorString " + varName + ";");
    else if (type == "bool") addToBuild("VectorBool " + varName + ";");

    vectorVariableNames.push(varName);

    addToBuild("\t" + varName + ".value = {\n");
    while (words[j] != "]") {
      j = skipSpaces(words, j + 1);
      if (words[j] != "]") {
        addToBuild(words[j]);
      }
    }

    addToBuild("};\n\t");
  }

  // Not an array
  else {
    const varValue = words[j];
    addToBuild("auto " + varName + "=" + varValue);
  }

  i += j - i;

  return i;
}

function skipToEndOfFunction(words: string[], i: number) {
  let j = i;
  let bracketCount = 0;
  let bracketsStarted = false;

  while (j < words.length) {
    if (words[j] == "{") {
      bracketCount++;
      bracketsStarted = true;
    }
    if (words[j] == "}") bracketCount--;
    if (bracketsStarted && bracketCount == 0) return j;

    j++;
  }

  return j;
}

function skipToNextFunction(words: string[], i: number) {
  let j = i;
  while (j < words.length) {
    if (words[j] == "fn") return j;
    j++;
  }

  return j;
}

function handleAddFn(words: string[], i: number) {
  addToBuild("auto ");
  i = skipSpaces(words, i + 1);
  addToBuild(words[i] + " = []");

  i = skipSpaces(words, i + 1);

  // Add parameters
  addToBuild("(");

  i = skipSpaces(words, i + 1);
  if (words[i] == ")") addToBuild(")");
  else {
    while (words[i] != ")") {
      addToBuild("auto " + words[i]);
      i = skipSpaces(words, i + 1);

      if (words[i] == ")") {
        addToBuild(")");
        break;
      }

      addToBuild(",");
      i = skipSpaces(words, i + 1);
    }
  }

  // Add function body
  addToBuild("\n");

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
    else if (word == ";") addToBuild(";\n\t");
    else if (word == "{") addToBuild("{\n\t");
    else if (word == "}") addToBuild("};\n\t");
    else if (word == "fn") i = handleAddFn(words, i);
    else if (addDotValue) addToBuild(word + ".value");
    else if (word != "fn") addToBuild(word);
  }
}

// extern "C" {

export default function compile(lines: string[]) {
  clearBuild();

  includeToBuild();
  addClasses();
  addFunctions();

  addMainFunction();
  readFile(lines);
  endMainFunction();

  // return "PP\n\nPP";

  return cppOutput;
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
