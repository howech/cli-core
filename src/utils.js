import Table from 'cli-table'
import Prompt from './prompt'
import os from 'os'

/**
 * For structuring help menu
 * @param labels
 * @returns {function()}
 */
const logger = labels => {
    return (...data) => {
        const table = new Table({
            chars: {
                'top': '',
                'top-mid': '',
                'top-left': '',
                'top-right': '',
                'bottom': '',
                'bottom-mid': '',
                'bottom-left': '',
                'bottom-right': '',
                'left': '',
                'left-mid': '',
                'mid': '',
                'mid-mid': '',
                'right': '',
                'right-mid': '',
                'middle': ''
            },

            head: labels
        })

        table.push(...data)
        console.log(table.toString())
    }
}

const prompt = (error, success) => {
    const getLabel = () => {
        const cwd = process.cwd()
        const hd = os.homedir()
        let label = cwd
        if (cwd.indexOf(hd) > -1) {
            label = cwd.replace(hd, '')
            if (label == '') {
                label = '~/'
            } else {
                label = `~${label}`
            }
        }

        return label
    }

    Prompt(getLabel(), (err, result) => {
        if (!err) {
            const args = _.split(result, ' ')
            const p = args[0]
            if (p == 'exit') {
                return
            }
            if (p == '') {
                return prompt()
            }

            success(result)
        } else error(err)
    })
}

export { logger as default, logger }