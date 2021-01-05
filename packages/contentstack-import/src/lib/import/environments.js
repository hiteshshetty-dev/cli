/*!
 * Contentstack Import
 * Copyright (c) 2019 Contentstack LLC
 * MIT Licensed
 */

const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')

const request = require('../util/request')
const helper = require('../util/fs')
let { addlogs } = require('../util/log')
let util = require('../util/')
const chalk = require('chalk')
let stack = require('../util/contentstack-management-sdk')

let config = require('../../config/default')
let environmentConfig = config.modules.environments
let environmentsFolderPath
let envMapperPath
let envUidMapperPath
let envSuccessPath
let envFailsPath
let client

function importEnvironments() {
  this.fails = []
  this.success = []
  this.envUidMapper = {}
}

importEnvironments.prototype = {
  start: function (credentialConfig) {
    let self = this
    config = credentialConfig
    addlogs(config, 'Migrating environment', 'success')
    environmentsFolderPath = path.resolve(config.data, environmentConfig.dirName)
    envMapperPath = path.resolve(config.data, 'mapper', 'environments')
    envUidMapperPath = path.resolve(config.data, 'mapper', 'environments', 'uid-mapping.json')
    envSuccessPath = path.resolve(config.data, 'environments', 'success.json')
    envFailsPath = path.resolve(config.data, 'environments', 'fails.json')
    self.environments = helper.readFile(path.resolve(environmentsFolderPath, environmentConfig.fileName))
    client = stack.Client(config)
    if (fs.existsSync(envUidMapperPath)) {
      self.envUidMapper = helper.readFile(envUidMapperPath)
      self.envUidMapper = self.envUidMapper || {}
    }

    mkdirp.sync(envMapperPath)
    return new Promise(async function (resolve, reject) {
      if (self.environments === undefined) {
        addlogs(config, chalk.yellow('No Environment Found'), 'error')
        return resolve()
      }

      let envUids = Object.keys(self.environments)
      // return Promise.map(envUids, function (envUid) {
      for (let i = 0; i < envUids.length; i++) {
        let envUid = envUids[i]
        let env = self.environments[envUid]
        if (!self.envUidMapper.hasOwnProperty(envUid)) {
          let requestOption = {
            environment: env,
          }

          await client.stack({ api_key: config.target_stack, management_token: config.management_token }).environment().create(requestOption)
            .then(environment => {
              self.success.push(environment.items)
              self.envUidMapper[envUid] = environment.uid
              helper.writeFile(envUidMapperPath, self.envUidMapper)
              return
            }).catch(function (err) {
              let error = JSON.parse(err.message)
              if (error.errors.name) {
                addlogs(config, chalk.white('Environment: \'' + env.name + '\' already exists'), 'error')
              } else {
                addlogs(config, chalk.white('Environment: \'' + env.name + '\' failed to be import\n ' + JSON.stringify(error.errors)), 'error')
              }
              return
            })
        } else {
          // the environment has already been created
          addlogs(config, chalk.white('The environment: \'' + env.name +
            '\' already exists. Skipping it to avoid duplicates!'), 'success')
          return
        }
        // import 2 environments at a time
      }
      //   // environments have imported successfully
      helper.writeFile(envSuccessPath, self.success)
      addlogs(config, chalk.green('Environments have been imported successfully!'), 'success')
      return resolve()
    })
  },
}

module.exports = new importEnvironments()
