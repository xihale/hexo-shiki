// const fs = require("fs");

const shiki = require("shiki");
const he = require("he");

function debug(data) {
  // fs.writeFile("index.txt", data.source, {
  //   flag: "a",
  // },_=>{});
}

hexo.extend.filter.register(
  "after_post_render",
  async (data) => {
    if (
      data.layout !== "post" ||
      data?.shiki?.enable === false ||
      (data?.shiki?.enable === undefined &&
        (hexo.config?.shiki?.enable === false ||
          hexo.config?.shiki?.enable === undefined))
    )
      return data;

    debug(data);

    // Get the Language names: class="language-(.*?)"
    const langPattern = /class="language-(.*?)"/gms;
    let matches,
      langs = [];
    while ((matches = langPattern.exec(data.content)) !== null) {
      // matches[1] is the value of (.*?)
      matches[1] = matches[1].toLowerCase();
      const bundles = shiki.BUNDLED_LANGUAGES.filter((bundle) => {
        // Languages are specified by their id, they can also have aliases (i. e. "js" and "javascript")
        return bundle.id === matches[1] || bundle.aliases?.includes(matches[1]);
      });
      if (bundles === 0) {
        // the language is not supported
        console.warn(
          `\x1b[35mLanguage \x1b[31m'${matches[1]}' \x1b[35m not supported \x1b[0m \n\tat  ${data.source}`
        );
        return data;
      }
      langs.push(matches[1]);
    }

    var highlighter = await shiki.getHighlighter({
      theme: data?.shiki?.theme ?? hexo?.shiki?.theme ?? "one-dark-pro",
      langs: langs,
    });

    let count = 0;
    const pewPattern = /<pre>(.*?)<\/pre>/gs;
    while ((matches = pewPattern.exec(data.content)) !== null) {
      matches[1] = matches[1].replace(/<(.*?)>/g, "");
      matches[1] = he.decode(matches[1]);

      data.content = data.content.replace(
        matches[0],
        await highlighter.codeToHtml(matches[1], { lang: langs[count] })
      );
      ++count; // get next lang
    }

    debug(data);

    return data;
  },
  11
);
