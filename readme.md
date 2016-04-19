## cli-core

A tool for building very simple cli's

#### Example

`demo.js`
```javascript
import { define, command, option, flags, init } from 'cli-core'

define(
    command(
        "say-hello",
        "This command just says hi",
        () => {
            if (option('french')) return "Bonjour!"
        
            return "Hi!"
        }
    )
)

flags([
    '--french', 'Say hello in french'
])

init()
```

```
$ node demo.js
$
Simple-cli help text

Available commands:

  - say-hello  This command just says hi

Available flags:

 --french  Say hello in french
```

```
$ node demo.js say-hello
$ Hi!
```

```
$ node demo.js say-hello --french
$ Bonjour!
```

## API Reference

### `define(...commands)`

Define a collection of commands that `cli-core` has access to. Accepts a sequence of `command`

### `command(name, man, action, ...commands)`

Create a command to be available through the terminal

###### `name` [string]

The name of the command.

+ To make a wildcard command, prefix your command name with `:` eg `:name`. A wildcard command should be defined last in sequence.
+ To create command aliases, use a `|` between commands eg: `list|ls`
+ If the command name ends with a `]`, then it will absorb all subsequent command arguments - and pass them as a parameter to `action`.
for example - if a command `absorb]` was defined and was used like so: `cli absorb a b c d` - then the arguments `a b c d` will be passed
into the absorb commands action.

###### `man` [string]

The commands manual - a description of the command. This is used in `cli-core`'s `help` menu

###### `action` [function]

A function to be run for it's specific command. This functions output can be injected into nested commands.

+ returning `[string]` will pass the string to `console` if there are no other commands in the sequence.
+ returning `[object]` will do the following with its properties:
    + `object.payload` - data to be injected into the following command in sequence
    + `object.action` [function | string] - an action to be run if this command is the last in its sequence. If `action` is a function, it will be run, else it will be passed to `console`

Accepts `payload` [object]

+ `payload.name` - The inputted value of the command run. Useful for wildcard commands.
+ `payload.data` - Any data that the previous command in the sequence might want to pass down
+ `payload.args` - An array of command line arguments following the last command that did not match any defined commands.

###### `...commands`

A sequence of nested commands to be run next

### `option(name)`

Accepts a string `name` and returns that option/flags value or `null` if it was not in sequence.

### `setHelpText(text)`

Set the description text that appears when running any help commands.

### `help()`

Displays the help listing for available commands and flags

### `getUnusedArgs()`

Get all arguments that are not defined as commands and have not been used in the current sequence via `option()`. Returns [array]

### `init()`

Begin constructing the command sequence based on command line arguments. This should be run after defining all commands you want your cli to use