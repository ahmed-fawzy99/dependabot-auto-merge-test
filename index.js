// Dummy entrypoint — exists only so the pinned dependencies have a "user".
// The point of this repo is the Dependabot auto-merge workflow, not this code.
const ms = require("ms");
const _ = require("lodash");

console.log(_.capitalize("hello"), "in", ms(60000));
