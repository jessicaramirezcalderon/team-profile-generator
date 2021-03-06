const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const managerQuestions = require("./lib/managerquestions");
const engineerQuestions = require("./lib/engineerquestions");
const internQuestions = require("./lib/internquestions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

let numberOfEngineers;
let numberOfInterns;
let managerAnswers;
let engineerAnswers;

//set up output dir path
const OUTPUT_DIR = path.resolve(__dirname, "output");
//produce final output combiing dir path and html file path
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


inquirer.prompt(managerQuestions)
    .then((answers) => {
        managerAnswers = answers;

        const questions = [];
        numberOfEngineers = answers.numberOfEngineers
        numberOfInterns = answers.numberOfInterns;
        for (let i = 1; i <= numberOfEngineers; i++) {
            engineerQuestions.forEach((question) => {
                //add questions to each additional entry 
                const q = {
                    ...question,
                    message: question.message + `(#${i})`,
                    name: question.name + i
                };

                questions.push(q);
            });
        }
        //prompt engineer questions once code above is executed
        return inquirer.prompt(questions);
    })
    .then((answers) => {
        //chain to be able to use in intern section below
        engineerAnswers = answers;
        const questions = [];
        for (let i = 1; i <= numberOfInterns; i++) {
            internQuestions.forEach((question) => {
                const q = {
                    ...question,
                    message: question.message + `(#${i})`,
                    name: question.name + i
                };

                questions.push(q);
            });
        }
        //prompt intern questions once code above is executed
        return inquirer.prompt(questions);
    })
    .then((answers) => {
        const employees = [];
        const manager = new Manager(managerAnswers.managerName, managerAnswers.managerId, managerAnswers.managerEmail, managerAnswers.managerNumber);

        employees.push(manager);

        console.log(`Manager Name: ${manager.getName()}`);
        console.log(`Manager ID: ${manager.getId()}`);
        console.log(`Manager Email: ${manager.getEmail()}`);
        console.log(`Manager Office Number: ${manager.getOfficeNumber()}`);
        console.log(`Manager Role: ${manager.getRole()}`);

        for (let i = 1; i <= numberOfEngineers; i++) {
            const engineer = new Engineer(engineerAnswers[`engineerName${i}`], engineerAnswers[`engineerId${i}`], engineerAnswers[`engineerEmail${i}`], engineerAnswers[`engineerGithub${i}`]);

            console.log(`Engineer Name: ${engineer.getName()}`);
            console.log(`Engineer ID: ${engineer.getId()}`);
            console.log(`Engineer Email: ${engineer.getEmail()}`);
            console.log(`Engineer Github: ${engineer.getGithub()}`);
            console.log(`Engineer Role: ${engineer.getRole()}`);

            employees.push(engineer);
        }

        for (let i = 1; i <= numberOfInterns; i++) {
            const intern = new Intern(answers[`internName${i}`], answers[`internId${i}`], answers[`internEmail${i}`], answers[`internSchool${i}`]);

            console.log(`Intern Name: ${intern.getName()}`);
            console.log(`Intern ID: ${intern.getId()}`);
            console.log(`Intern Email: ${intern.getEmail()}`);
            console.log(`Intern School: ${intern.getSchool()}`);
            console.log(`Intern Role: ${intern.getRole()}`);

            employees.push(intern);
        }

        fs.writeFile('output/index.html', render(employees), (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
            // success case, the file was saved
            console.log('File saved!');
        });
    })
    .catch((err) => console.error(err));

