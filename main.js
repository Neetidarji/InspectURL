import validator from 'validator'
import chalk from 'chalk'
import fs from 'fs'

const commandLineURL = process.argv[2]
const filePath = 'results.json'

if (commandLineURL) {
    const isValid = validator.isURL(commandLineURL, { require_protocol: true })

    console.log(isValid 
        ? chalk.green(`${commandLineURL} is a valid URL.`) 
        : chalk.red(`${commandLineURL} is not a valid URL.`))

    if (isValid) {
        const data = { url: commandLineURL, isValid, timestamp: new Date().toISOString() }
        const results = fs.existsSync(filePath) 
            ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) 
            : []

        results.push(data);
        fs.writeFileSync(filePath, JSON.stringify(results, null, 2), 'utf-8')
    }
} else {
    console.log(chalk.yellow("Please provide a URL as a command-line argument."))
}
