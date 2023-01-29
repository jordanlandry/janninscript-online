interface Props {
  lines: string[];
  activeLine: number;
  linePosition: number;
  phantomBracket: number;
  currentMaxPosition: number;
}

function getTabSize(lineNumber: number, lines: string[]) {
  let tabSize = 0;
  for (let i = 0; i < lines[lineNumber].length; i++) {
    if (lines[lineNumber][i] === " ") tabSize++;
    else break;
  }

  return tabSize;
}

function spliceSlice(str: string, index: number, count: number, add: string) {
  if (index < 0) {
    index = str.length + index;
    if (index < 0) index = 0;
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

const backspace = (props: Props) => {
  const line = props.lines[props.activeLine];

  // Filter out the character at the line position, basically running
  // line.filter((char:string, index:number) => index !== linePosition); on a string

  let newStr = "";
  for (let i = 0; i < line.length; i++) {
    if (i === props.linePosition - 1) continue;

    newStr += line[i];
  }

  props.lines[props.activeLine] = newStr;

  // If the line position is 0, we need to merge the current line with the previous line
  if (props.linePosition === 0) {
    if (props.activeLine === 0) return;

    const prevLength = props.lines[props.activeLine - 1].length;

    props.lines[props.activeLine - 1] += props.lines[props.activeLine];
    props.lines.splice(props.activeLine, 1);

    props.linePosition = prevLength;

    props.activeLine--;
  } else props.linePosition--;

  return props;
};

const deleteKey = (props: Props) => {
  const line = props.lines[props.activeLine];

  let newStr = "";
  for (let i = 0; i < line.length; i++) {
    if (i === props.linePosition) continue;

    newStr += line[i];
  }

  props.lines[props.activeLine] = newStr;

  // If the line position is the same as the length of the line, we need to merge the current line with the next line
  if (props.linePosition === line.length) {
    if (props.activeLine === props.lines.length - 1) return;

    props.lines[props.activeLine] += props.lines[props.activeLine + 1];
    props.lines.splice(props.activeLine + 1, 1);
  }

  return props;
};

const enter = (props: Props) => {
  // Move everything to the right of the linePosition to the next line
  const newLine = props.lines[props.activeLine].slice(props.linePosition);
  props.lines[props.activeLine] = props.lines[props.activeLine].slice(0, props.linePosition);

  props.lines.splice(props.activeLine + 1, 0, newLine);

  const tabSize = getTabSize(props.activeLine, props.lines);

  // props.linePosition = 0;
  props.activeLine = Math.min(props.activeLine + 1, props.lines.length - 1);
  props.lines[props.activeLine] = " ".repeat(tabSize) + props.lines[props.activeLine];
  props.linePosition = tabSize;

  // Check if the next letter is a closing bracket, if so,
  // add a new line for the bracket and an extra tab for the current line

  return props;
};

const tab = (props: Props) => {
  props.lines[props.activeLine] = spliceSlice(props.lines[props.activeLine], props.linePosition, 0, "    ");
  props.linePosition += 4;

  return props;
};

const arrowLeft = (props: Props) => {
  if (props.linePosition === 0) {
    if (props.activeLine === 0) return props;

    props.activeLine--;
    props.linePosition = props.lines[props.activeLine].length;
  } else props.linePosition--;

  props.currentMaxPosition = props.linePosition;

  return props;
};

const arrowRight = (props: Props) => {
  if (props.linePosition === props.lines[props.activeLine].length) {
    if (props.activeLine === props.lines.length - 1) return props;

    props.activeLine++;
    props.linePosition = 0;
  } else props.linePosition++;

  props.currentMaxPosition = props.linePosition;

  return props;
};

const arrowUp = (props: Props) => {
  if (props.activeLine === 0) return props;

  props.activeLine--;

  const line = props.lines[props.activeLine];
  const lineLength = line.length;

  props.linePosition = Math.min(props.currentMaxPosition, lineLength);

  if (props.linePosition > lineLength) props.linePosition = lineLength;

  return props;
};

const arrowDown = (props: Props) => {
  if (props.activeLine === props.lines.length - 1) return props;

  props.activeLine++;

  const line = props.lines[props.activeLine];
  const lineLength = line.length;

  props.linePosition = Math.min(props.currentMaxPosition, lineLength);

  if (props.linePosition > lineLength) props.linePosition = lineLength;

  return props;
};

const home = (props: Props) => ({ ...props, linePosition: 0, currentMaxPosition: 0 });
const end = (props: Props) => ({
  ...props,
  linePosition: props.lines[props.activeLine].length,
  currentMaxPosition: props.lines[props.activeLine].length,
});

export function handleKeybind(e: KeyboardEvent, props: Props) {
  if (e.key === "Backspace") return backspace(props);
  if (e.key === "Delete") return deleteKey(props);
  if (e.key === "Enter") return enter(props);
  if (e.key === "Tab") return tab(props);
  if (e.key === "ArrowLeft") return arrowLeft(props);
  if (e.key === "ArrowRight") return arrowRight(props);
  if (e.key === "ArrowUp") return arrowUp(props);
  if (e.key === "ArrowDown") return arrowDown(props);
  if (e.key === "Home") return home(props);
  if (e.key === "End") return end(props);
  else return props;
}

export const preventDefaultKeys = {
  normal: new Set([" ", "End", "Home", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]),
  ctrl: new Set(["c", "v", "x", "a"]),
};
