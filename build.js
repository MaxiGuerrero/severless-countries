const fs = require("fs-extra");
const path = require("path");

const origin = path.join(
  path.resolve("."),
  "src/functions/api-docs/swagger.yaml"
);

const dest = path.join(
  path.resolve("."),
  ".build/src/functions/api-docs/swagger.yaml"
);

fs.copy(origin, dest, (err) => {
  if (err) {
    console.error("error!", err);
  } else {
    console.log("Build extra file done!");
  }
});
