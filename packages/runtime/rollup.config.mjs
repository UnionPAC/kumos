import cleanup from "rollup-plugin-cleanup";
import filesize from "rollup-plugin-filesize";

export default {
  input: "src/index.js", // entry point of the framework code
  plugins: [cleanup()], // remove comments from the generated bundle
  output: [
    {
      file: "dist/kumos.js", // name of the generated bundle
      format: "esm", // format as an ES module
      plugins: [filesize()], // display size of the generated bundle
    },
  ],
};
