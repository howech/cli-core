import { init, define, command, option, flags } from '../src/index'

define(
    command(
        "say-hello",
        "This command just says hi",
        (ok) => {
            if (option('french')) return "Bonjour!"

            return "Hi!"
        }
    )
)

flags([
    '--french', 'Say hello in french'
])

init()