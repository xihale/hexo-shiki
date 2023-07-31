# hexo-shiki

## Preface
hexo shiki code highlight js library support(**just backend mode**)
> **Warn**: It's in dev! It's unstable!

## USAGE
What you write in Front-matter will cover the default value in _config.yml!
> the themes and languages support is in the offical page - [shiki docs](https://github.com/shikijs/shiki/tree/main/docs)
```yaml
shiki:
  enable: (true/false)
  theme: (one-dark-pro/nord/...)
```

## self build shiki

When you have a `self build` shiki and want to use for `hexo-shiki`
you can copy the `languages`/`themes` and main export file `index.js` to `node_modules/shiki/`

> If there is not `node_modules/shiki/`, just find it in upper folder or you can run `yarn` to install