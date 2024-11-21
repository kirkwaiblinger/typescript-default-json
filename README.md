# TS ResolveJsonModule Demo

SETUP: `pnpm i`.

Play around with:

- `pnpm jest` to see the jest test results. The types in the jest code do not match their runtime behavior.
- `pnpm tsc && pnpm runBuilt` to run tsc and then node on the output.
- (or, `pnpm runSource` to just use ts-node).

Try messing with the "module" option.

I'd like to understand how to configure the project so that the types appearing
in the jest code match their runtime behavior, and so that the runtime behavior
of the jest code matches the runtime behavior of the TS code (for example if the
jest file imports a source file that imports a json module);
