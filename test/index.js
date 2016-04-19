import { init, define, command, option, flags, prompt } from '../src/index'

define(
    command(
        "say-hello]",
        "This command just says hi",
        (ok) => {
            console.log(ok)
            if (option('french')) return "Bonjour!"

            prompt('ok', (err, res) => console.log(res))

            return "Hi!"
        }
    )
)

flags([
    '--french', 'Say hello in french'
])

init()