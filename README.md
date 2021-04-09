# lang-julia

This package implements [Julia][] language support for the [CodeMirror 6][] code
editor.

Features:

- Syntax highlighting
- Indentation
- Keyword completion (optional)

## Usage

```
import { julia } from "lang-julia";

let state = EditorState.create({
  ...
  extensions: [
    julia(),
    ...
  ]
});
```

Consult TypeScript type definition for additional documentation.

[Julia]: https://julialang.org
[CodeMirror 6]: https://codemirror.net/6/
