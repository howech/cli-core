import { init, define, command, option, getUnusedOptions } from '../src/index'

define(
    command('name', 'man', () => {
        console.log(getUnusedOptions())
    })
)

init()