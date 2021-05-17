const {Command, flags} = require('@oclif/command')
const Configstore = require('configstore')
const config = new Configstore('contentstack_cli')

const propertiesToHide = [
  'uuid',
  'authtoken',
]

class ViewCommand extends Command {
  async run() {
    const {flags} = this.parse(ViewCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/abhinav/Documents/contentstack/cli/packages/contentstack/src/commands/view.js`)
    const globalConfig = this.hideSensitiveData(config.all)
    this.log(globalConfig)
    this.log(`The config file is store at ${config.path}`)
  }

  hideSensitiveData(data) {
    let result = data
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      if (typeof data[keys[i]] === 'object') {
        result[keys[i]] = this.hideSensitiveData(data[keys[i]])
      }
      if (propertiesToHide.indexOf(keys[i]) > -1) {
        result[keys[i]] = this.asteriskize(data[keys[i]])
      }
    }
    return result
  }

  asteriskize(data) {
    let visiblePart = 0.3
    return data.substring(0, Math.floor(data.length * visiblePart)) + data.substring(Math.floor(data.length * visiblePart), data.length).replace(/\w/g, '*')
  }
}

ViewCommand.description = `Describe the command here
...
Extra documentation goes here
`

ViewCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = ViewCommand
