import { TreeIndentContext, continuedIndent } from "@codemirror/language";

export type GetIndent = (context: TreeIndentContext) => number;

function delimitedStrategy(
  context: TreeIndentContext,
  units: number,
  closing: readonly string[]
) {
  let after = context.textAfter;
  let space = after.match(/^\s*/)![0].length;
  let closed = false;
  switch (closing.length) {
    case 1:
      closed = after.slice(space, space + closing[0].length) === closing[0];
      break;
    case 2:
      closed =
        after.slice(space, space + closing[0].length) === closing[0] ||
        after.slice(space, space + closing[1].length) === closing[1];
      break;
    case 3:
      closed =
        after.slice(space, space + closing[0].length) === closing[0] ||
        after.slice(space, space + closing[1].length) === closing[1] ||
        after.slice(space, space + closing[2].length) === closing[2];
      break;
    default:
      closed = closing.some(
        (closing) => after.slice(space, space + closing.length) === closing
      );
      break;
  }
  return context.baseIndent + (closed ? 0 : context.unit * units);
}

export function delimitedIndent({
  closing,
  units = 1,
}: {
  closing: readonly string[];
  units?: number;
}) {
  return (context: TreeIndentContext) =>
    delimitedStrategy(context, units, closing);
}

export function noIndent(context: TreeIndentContext) {
  return context.baseIndent;
}

// Re-export for convenience
export { continuedIndent };
