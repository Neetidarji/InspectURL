import validator from 'validator'
import chalk from 'chalk'
import fs from 'fs'
const commandLineURL = process.argv[2]
if (commandLineURL) {
    let validationResult = false

    if (validator.isURL(commandLineURL, { require_protocol: true })) {
        console.log(chalk.green(`${commandLineURL} is a valid URL.`))
        validationResult = true
    } else {
        console.log(chalk.red(`${commandLineURL} is not a valid URL.`))
    }
    const data = {
        url: commandLineURL,
        isValid: validationResult,
        timestamp: new Date().toISOString(), 
    }
    const filePath = 'results.json'
    let results = []
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf-8')
            results = JSON.parse(fileData);
        } catch (error) {
            console.error(chalk.red(`Error reading file: ${error.message}`))
        }
    }
    results.push(data)
    try {
        fs.writeFileSync(filePath, JSON.stringify(results, null, 2), 'utf-8')
        console.log(chalk.blue(`Validation result has been saved to ${filePath}`))
    } catch (error) {
        console.error(chalk.red(`Error writing to file: ${error.message}`))
    }
} else {
    console.log(chalk.yellow("Please provide a URL as a command-line argument."))
}
