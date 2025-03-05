

const shellQuestions = require('../index').shellQuestions;

const questions = [
    {
        name: 'username',
        type: 'text',
        message: 'Enter your username',
        default: 'guest',
    },
    {
        name: 'filePath',
        type: 'text',
        message: 'Enter the file path (use double quotes for spaces)',
    },
    {
        name: 'environment',
        type: 'radio',
        message: 'Choose environment',
        choices: ['Development', 'Staging', 'Production'],
    },
    {
        name: 'features',
        type: 'checkbox',
        message: 'Select features',
        choices: ['Logging', 'Caching', 'Authentication', 'Analytics'],
    },
    {
        name: 'customCommand',
        type: 'text',
        message: 'Enter a custom command (with flags and values in quotes):'
    }
];

async function runShell(questions) {

    const answers = await shellQuestions().interactiveShell(questions);
    console.log('Answers:', answers);

    // You can now use the 'answers' object to execute commands or perform other actions.
    // Example:
    if (answers.customCommand) {
        console.log(`Executing: ${answers.customCommand}`);
        // You would typically use child_process to execute the command here.
    }
}

runShell(questions);
