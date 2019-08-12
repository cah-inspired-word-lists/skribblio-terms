#!/usr/bin/env node

const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

const termsFile = resolve(__dirname, "../terms.txt");

const termsString = readFileSync(termsFile).toString();
const sortedTerms = termsString.replace(/,*\n*$/, "").split(",\n").sort();
const sortedTermsString = sortedTerms.join(",\n")+"\n"

if (sortedTermsString !== termsString) {
  console.error("Not in correct order")
  if(process.argv.includes("--print")) {
    console.log(`\`\`\`
${sortedTermsString}
\`\`\``);
  }
  if (process.argv.includes("--write")) {
    writeFileSync(termsFile, sortedTermsString);
    console.log(`Wrote to "${termsFile}."`);
  } else {
    process.exit(0);
  }
} else {
  console.log("Already in alphabetical order");
}