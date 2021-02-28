
const engineerQ = [
    {
        type: 'input',
        name: 'engineerName',
        message: 'What is your engineer\'s name?',
    },
    {
        type: 'number',
        name: 'engineerId',
        message: 'What is your engineer\'s ID?',
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is your engineer\'s email?',
    },
     //Engineer specific
    {
        type: 'input',
        name: 'engineerGithub',
        message: 'What is your engineer\'s GitHub username?',
    },
]

module.exports = engineerQ;


