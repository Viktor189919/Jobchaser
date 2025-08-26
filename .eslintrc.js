module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  ignorePatterns: [
    "node_modules/",
    ".prisma/",
    "generated/prisma/runtime/**" // <- specifically ignore Prisma runtime
  ],
  rules: {
    // your custom rules
  },
};