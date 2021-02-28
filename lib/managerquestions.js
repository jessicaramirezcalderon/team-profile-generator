
const managerQ = [
    {
        type: 'input',
        name: 'managerName',
        message: 'What is your name?',
    },
    {
        type: 'number',
        name: 'managerId',
        message: 'What is your ID?',
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is your email?',
    },
    //Manager specific
    {
        type: 'number',
        name: 'managerNumber',
        message: 'What is your office number?',
    },
    {
        type: 'number',
        name: 'numberOfEngineers',
        message: 'How many engineers are on your team?',
    },
    {
        type: 'number',
        name: 'numberOfInterns',
        message: 'How many interns are on your team?',
    }
]

module.exports = managerQ;


