"use struct";

import { codeToHtml } from "shiki";

// register shiki

// @ts-ignore
hexo.extend.highlight.register("shiki", async (code, options) => {
  console.log(code, options);
  // @ts-ignore
  return await codeToHtml(code, options);
});
