# sails-hook-dust-i18n
Dust.js (Linkedin) helpers that works with [Sails JS](http://sailsjs.org) default i18n hook

### Installation
1. Make sure your Sails app. use [Dust.js](https://github.com/linkedin/dustjs) as template engine
2. Install this hook by `npm install sails-hook-dust-i18n`

### Usage
*requires at least sails >= 0.11*

1. Use it in views with synthax `{@i18n}Welcome{/i18n}` or `{@__}Welcome{/__}` (both `i18n` and `__` has same functionality)
2. Make sure to define translation in `/config/locales/[locale].js` like `/config/locales/en.js`
3. That file contains translation in JSON format like `{ "Welcome": "Welcome to Sails!" }`

### References
1. [Sails i18n documentation](http://sailsjs.org/#!/documentation/concepts/Internationalization)
2. [Node-i18n](https://github.com/mashpie/i18n-node) (dependency that sails-hook-i18n rely on)

##License
MIT
