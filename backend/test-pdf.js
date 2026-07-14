const fs = require("fs");
const pdf = require("pdf-parse");

(async () => {
  try {
    const dataBuffer = fs.readFileSync("./Sample_Medical_Report.pdf");

    const result = await pdf(dataBuffer);

    console.log("Pages:", result.numpages);
    console.log("Text:\n", result.text);
  } catch (err) {
    console.error(err);
  }
})();