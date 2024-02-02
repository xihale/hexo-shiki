"use struct";

const shiki = require("shiki");
const he = require("he");

const useDebug = false;
const debug = useDebug ? require("./lib/debug") : { log: (_) => {} };
const options = require("./lib/options");

hexo.extend.filter.register(
  "after_post_render",
  async (data) => {
    const opt = options.mix(
      ["enable", "theme"],
      hexo.config?.shiki,
      data?.shiki,
      {enable: false, theme: 'one-dark-pro'}
    );

    // debug.log(JSON.stringify(opt));

    if (opt.enable !== true) return data;

    // debug.log(data.source);

    // Get the Language names: class="language-(.*?)"
    const pewPattern = /<pre>(.*?)<\/pre>/gs;
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

    // langs 去重
    raw_langs = [...new Set(langs)];

    debug.log(data.source+": "+raw_langs);
    var highlighter = await shiki.getHighlighter({
      theme: opt.theme !== undefined ? opt.theme : "one-dark-pro",
      langs: raw_langs,
    });

    let count = 0;
    while ((matches = pewPattern.exec(data.content)) !== null) {
      // plaintext
      if(!matches[1].includes("<code class=\"language-")){
        data.content = data.content.replace(
          matches[0],
          await highlighter.codeToHtml(matches[1].replace(/<(.*?)>/g, ""), { lang: "" })
        );
        continue;
      }

      matches[1] = matches[1].replace(/<(.*?)>/g, "");
      matches[1] = he.decode(matches[1]);

      data.content = data.content.replace(
        matches[0],
        await highlighter.codeToHtml(matches[1], { lang: langs[count] })
      ), ++count; // get next lang
    }

    // debug.log(data.source);

    return data;
  },
  20
);
