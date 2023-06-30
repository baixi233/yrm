#!/usr/bin/env node
var program = require('commander')

var handle = require('../lib/handle.js')
var PKG = require('../package.json')

program.version(PKG.version)

program
  .command('ls')
  .description('List all the registries')
  .action(handle.ls)
  
program
  .command('current')
  .description('Show current registry')
  .action(handle.current)

program
  .command('use <name>')
  .description('Change registry to <name>')
  .action(handle.use);

program
  .command('add <name> <url> [home]')
  .description('Add one custom registry')
  .action(handle.add);

program
  .command('edit <name> <url> [home]')
  .description('Edit <name> registry')
  .action(handle.edit);

program
  .command('del <name>')
  .description('Delete one registry')
  .action(handle.del);

program
  .command('info <name>')
  .description('Show info of <name> registry')
  .action(handle.info);

program
  .command('test [name]')
  .description('Show response time for specific or all registries')
  .action(handle.test);

program
  .command('reset')
  .description('Set all the registries to default')
  .action(handle.reset);

program
  .command('help')
  .description('Print this help')
  .action(handle.help);

program.parse(process.argv)

if(process.argv.length === 2){
  program.help()
}