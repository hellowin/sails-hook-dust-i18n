# sails-hook-dust-i18n
Dust.js (Linkedin) helpers that works with [Sails JS](http://sailsjs.org) default i18n hook

### Installation
1. Make sure your Sails app. use [Dust.js](https://github.com/linkedin/dustjs) as template engine
2. Install this hook by `npm install sails-hook-dust-i18n`

### Helpers Included
1. `i18n` (can also called by `__`)
2. `exec` see reference [here](https://github.com/hellowin/sails-hook-dust-exec)

### Usage
*requires at least sails >= 0.11*

1. There are 2 option that describe main text:

  1. Put text in body block, example: `{@i18n}Welcome{/i18n}` or `{@__}Welcome{/__}` (both `i18n` and `__` has same functionality)
  2. Put in `t` parameter, example: `{@i18n t="Welcome" /}` or `{@__ t="Welcome" /}`

2. Put arguments in `args` parameter if needed, example: `{@i18n args="['guys']" }Welcome %s{/i18n}` will rendered to `Welcomen guys` if locales catalog is like `{"Welcome %s": "Welcomen %s"}`
4. Make sure to define translation in `/config/locales/[locale].js` like `/config/locales/en.js`
5. That file contains translation in JSON format like `{ "Welcome": "Welcome to Sails!" }`

### References
1. [Sails i18n documentation](http://sailsjs.org/#!/documentation/concepts/Internationalization)
2. [Node-i18n](https://github.com/mashpie/i18n-node) (dependency that sails-hook-i18n rely on)

### Todo
1. Make body block rendering synchronously (look at index.js)
2. Add test case, it always thrown an error `Error: Cannot find module '../../../../sails-hooks'`
3. You suggest ...

### License
MIT
