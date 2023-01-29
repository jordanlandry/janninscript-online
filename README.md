# janninscript-online

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### TODO List

- Add a current max line position, ex when moving from a line on position 10, down to an empty line, then moving back up to the other line, it should bring you back to position 10.

- Add text select

- Set line position on click

- Add copying and pasting

- Change the prevent default to only specific keybinds

- Add the text to localstorage

- Only show cursor and type when focused on the text area

- When you press enter and a phantom curly bracket is there put it on a new line

- Add autotab

- Fix syntax highlighting when it's inside of a string

- Add Themes

- Make cursor only blink when you're not typing, and when you hit a key it reshows up...Probably just have a countdown and reset it everytime a key is pressed.

Add the following keybinds
All Arrow keybinds do the action in the direction of the arrow

| Keybind            | Function                     |
| ------------------ | ---------------------------- |
| Ctrl + Backspace   | Remove entire Word           |
| Ctrl + L / R Arrow | Move position by entire word |
| Alt + Arrow        | Swaps lines                  |
| Shift + Arrow      | Select letter                |
| Ctrl + A           | Select All                   |
| Ctr + S            | Run                          |
