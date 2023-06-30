var tools = require('./tool.js')

var print = tools.print
var padEnd = tools.padEnd
var getAllRegistries = tools.getAllRegistries
var getCurrentRegistry = tools.getCurrentRegistry
var changeRegistry = tools.changeRegistry
var addCustomRegistry = tools.addCustomRegistry
var editRegistry = tools.editRegistry
var delRegistry = tools.delRegistry
var resetRegistries = tools.resetRegistries
var testRegistries = tools.testRegistries

function ls() {
  getCurrentRegistry(function (registry) {
    var info = []
    var allRegistries = getAllRegistries()
    allRegistries.forEach(function (item) {
      var prefix = item.registry === registry ? '* ' : '  '
      info.push(prefix + padEnd(item.name, 12) + item.registry)
    })
    print(info)
  })
}

function current() {
  getCurrentRegistry(function (registry) {
    var allRegistries = getAllRegistries()
    var registry = allRegistries.filter(function (item) {
      return item.registry === registry
    })
    if (registry.length > 0) {
      print([
        '  Current registry:',
        '',
        '  Name:     ' + registry[0].name,
        '  Registry: ' + registry[0].registry,
        '  Home:     ' + registry[0].home,
        '  Custom:   ' + (registry[0].type === 'custom'),
      ])
    } else {
      print('  No registry found.')
    }
  })
}

function use(name) {
  var allRegistries = getAllRegistries()
  var registry = allRegistries.filter(function (item) {
    return item.name === name
  })
  if (registry.length === 1) {
    changeRegistry(registry[0].registry)
  } else if (registry.length > 1) {
    print(
      '  Find ' +
        registry.length +
        ' registry,please check your registry name or reset all registries'
    )
  } else {
    print('  Not find registry: ' + name)
  }
}

function add(name, url, home) {
  var allRegistries = getAllRegistries()
  var registry = allRegistries.filter(function (item) {
    return item.name === name
  })
  if (registry.length > 0) {
    return print('  Current registry name is already exist')
  }
  if (url[url.length - 1] !== '/') url += '/'
  registry = {
    type: 'custom',
    name: name,
    registry: url
  }
  if (home) {
    registry.home = home
  }
  addCustomRegistry(registry)
}

function edit(name, url, home) {
  editRegistry(name, url, home)
}

function del(name) {
  var allRegistries = getAllRegistries()
  var registry = allRegistries.filter(function (item) {
    return item.name === name
  })
  if (registry.length === 0) {
    return print('  Not find registry: ' + name)
  }
  delRegistry(name)
}

function info(name) {
  getCurrentRegistry(function (registryurl) {
    var allRegistries = getAllRegistries()
    var registry = allRegistries.filter(function (item) {
      return item.name === name
    })
    if (registry.length === 0) {
      return print('  Not find registry: ' + name)
    }
    print([
      '  ' + (name.slice(0, 1).toUpperCase() + name.slice(1)) + ' info:',
      '',
      '  Name:     ' + registry[0].name,
      '  Registry: ' + registry[0].registry,
      '  Home:     ' + registry[0].home,
      '  Current:  ' + (registry[0].registry === registryurl),
      '  Custom:   ' + (registry[0].type === 'custom'),
    ])
  })
}

function test(name) {
  var allRegistries = getAllRegistries()
  var registry = allRegistries.filter(function (item) {
    return item.name === name
  })
  if (name && registry.length === 0) {
    return print('  Not find registry: ' + name)
  }
  testRegistries(name ? registry : allRegistries)
}
function reset() {
  resetRegistries()
}
function help(program) {
  program.parent.help()
}

module.exports = {
  ls: ls,
  current: current,
  use: use,
  add: add,
  edit: edit,
  del: del,
  info: info,
  test: test,
  reset: reset,
  help: help
}
