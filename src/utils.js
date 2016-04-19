import Table from 'cli-table'
import Prompt from './prompt'
import _ from 'lodash'

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

const prompt = (label, cb) => {
    Prompt(label, (err, result) => {
        if (!err) {
            const args = _.split(result, ' ')
            const p = args[0]
            if (p == 'exit') {
                return
            }
            if (p == '') {
                return prompt()
            }

            cb(null, result)
        } else cb(err)
    })
}

export { logger as default, logger, prompt }