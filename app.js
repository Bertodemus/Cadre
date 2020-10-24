const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const figlet  = require("figlet");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

let employees = [];

figlet('CADRE', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

setTimeout( function () {
    init();
}, 1000);

function init() {

        console.log(
`
******************************
*     Welcome to Cadre!      *
******************************

This is a simple command-line based team creator.
You will be prompted to provide data for all of your team memebers;
Ther are three types to chose from:
        - Manager
        - Engineer
        - Intern

Let's get started!

`);

    // inquirer
    //     .prompt([
    //         {
    //             type: "message"


    //     ])
    newManager();
}


function newManager() { 
    inquirer
        .prompt([
            {
                type: "input",
                message: "Let's put your team together! Who will be your manager?",
                name: "name"
            },
            {
                type: "input",
                message: "What will be their ID number?",
                name: "id"
            },
            {
                type: "input",
                message: "What is their E-mail address?",
                name: "email"
            },
            {
                type: "input",
                message: "What is their office number?",
                name: "officeNumber"
            }
        ])
        .then(function(response) {
            const newMgr = new Manager(response.name, response.id, response.email, response.officeNumber);
            employees.push(newMgr);
            console.log(employees);
        });
}



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
