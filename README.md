# <center>@baixi/yrm [![NPM version][npm-image]][npm-url]</center>

## Description
Yrm is a yarn and npm registry manager,you can use yrm easyly to manage the registry!

## Install
```
$ npm install -g @baixi/yrm
```

## Example
```
$ yrm ls

* npm -------- https://registry.npmjs.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npmmirror.com/
  nj --------- https://registry.nodejitsu.com/
  rednpm ----- http://registry.mirror.cqupt.edu.cn/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
  yarn ------- https://registry.yarnpkg.com/
```
```
$ yrm use npm

  YARN Registry has been set to: https://registry.npmjs.com/

  NPM Registry has been set to: https://registry.npmjs.com/
```

## Usage
```
Usage: yrm [command]

  Commands:

    ls                        List all the registries
    current                   Show current registry
    use <name>                Change registry to <name>
    add <name> <url> [home]   Add one custom registry
    edit <name> <url> [home]  Edit <name> registry
    del <name>                Delete one registry
    info <name>               Show info of <name> registry
    test [name]               Show response time for specific or all registries
    reset                     Set all the registries to default
    help                      Print this help

Usage: yrm [options]
  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Registries
* npm : [https://www.npmjs.com](https://www.npmjs.com)
* cnpm : [http://cnpmjs.org](http://cnpmjs.org)
* taobao : [https://npmmirror.com](https://npmmirror.com)
* nj : [https://www.nodejitsu.com](https://www.nodejitsu.com)
* rednpm : [http://npm.mirror.cqupt.edu.cn](http://npm.mirror.cqupt.edu.cn)
* npmMirror : [https://skimdb.npmjs.com](https://skimdb.npmjs.com)
* edunpm : [http://www.enpmjs.org](http://www.enpmjs.org)
* yarn : [https://yarnpkg.com](https://yarnpkg.com)

## Notice
* The registry url must be end with  "/".
* If you encounter an unsolvable problem, you can use the "reset" command to reset and set up a new registry.

## LICENSE
[MIT](https://github.com/baixi233/yrm/blob/master/LICENSE)

## 

[npm-image]: https://img.shields.io/npm/v/@baixi/yrm
[npm-url]: https://npmjs.org/package/@baixi/yrm