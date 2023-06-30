var path = require('path')
var fs = require('fs')
var npm = require('npm')
var https = require('https')
var YARNRC = path.join(process.env.HOME, '.yarnrc')
var REGISTRIES_PATH = path.join(__dirname, '../registries.json')
var padSpace = '                        '

function getAllRegistries() {
  return require('../registries.json')
}

function getCurrentRegistry(callback) {
  npm.load(function (err) {
    if (err) return exit(err)
    callback(npm.config.get('registry'))
  })
}

function changeRegistry(registry) {
  var info = []
  fs.writeFile(YARNRC, 'registry "' + registry + '"', function (err) {
    if (err) return exit(err)
    info.push('  YARN Registry has been set to: ' + registry)
    info.length === 2 && print(info)
  })
  npm.load(function (err) {
    if (err) return exit(err)
    npm.commands.config(['set', 'registry', registry], function (err) {
      if (err) return exit(err)
      var newRegistry = npm.config.get('registry')
      info.push('  NPM Registry has been set to: ' + newRegistry)
      info.length === 2 && print(info)
    })
  })
}

function addCustomRegistry(registry) {
  var allRegistries = getAllRegistries()
  allRegistries.push(registry)
  fs.writeFile(REGISTRIES_PATH, JSON.stringify(allRegistries, null, 2), function (err) {
    if (err) return exit(err)
    print('  Add Registry ' + registry.name + ' success')
  })
}

function editRegistry(name, url, home) {
  var allRegistries = getAllRegistries()
  var registry = allRegistries.filter(function (item) {
    return item.name === name
  })
  if (registry.length === 0) {
    return print('  No registry found with ' + name)
  }
  registry[0].registry = url
  registry[0].home = home || registry[0].home
  fs.writeFile(REGISTRIES_PATH, JSON.stringify(allRegistries, null, 2), function (err) {
    if (err) return exit(err)
    print('  Del Registry ' + name + ' success')
  })
}

function delRegistry(name) {
  var allRegistries = getAllRegistries()
  allRegistries = allRegistries.filter(function (item) {
    return item.name !== name
  })
  fs.writeFile(REGISTRIES_PATH, JSON.stringify(allRegistries, null, 2), function (err) {
    if (err) return exit(err)
    print('  Del Registry ' + name + ' success')
  })
}

function resetRegistries() {
  fs.writeFile(
    REGISTRIES_PATH,
    JSON.stringify(require('../registries.static.json'), null, 2),
    function (err) {
      if (err) return exit(err)
      print('  Reset Registries success')
    }
  )
}

function testRegistries(registries) {
  var info = []
  getCurrentRegistry(function (registryurl) {
    registries.forEach(function (registry) {
      var start = Date.now()
      https
        .get(registryurl + 'pedding', function () {
          var prefix = registry.registry === registryurl ? '* ' : '  '
          var suffix = '✓ ' + (Date.now() - start) + 'ms'
          info.push(prefix + padEnd(registry.name, 12) + suffix)
          if (info.length === registries.length) {
            print(info)
          }
        })
        .on('error', function () {
          var prefix = registry.registry === registryurl ? '* ' : '  '
          var suffix = '✗'
          info.push(prefix + padEnd(registry.name, 12) + suffix)
          if (info.length === registries.length) {
            print(info)
          }
        })
    })
  })
}

function exit(msg) {
  printErr(msg)
  process.exit(1)
}

function printErr(msg) {
  console.log('an error occured:')
  console.log(msg)
}

function print(msgs) {
  if (typeof msgs === 'string') msgs = [msgs]
  msgs.unshift(padSpace)
  msgs.forEach(function (msg) {
    console.log(msg)
  })
}

function padEnd(str, len) {
  return str + ' ' + new Array(Math.max(1, len - str.length)).join('-') + ' '
}

module.exports = {
  getAllRegistries: getAllRegistries,
  getCurrentRegistry: getCurrentRegistry,
  changeRegistry: changeRegistry,
  addCustomRegistry: addCustomRegistry,
  editRegistry: editRegistry,
  delRegistry: delRegistry,
  resetRegistries: resetRegistries,
  testRegistries: testRegistries,
  printErr: printErr,
  print: print,
  padEnd: padEnd
}
