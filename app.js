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
You will be prompted to provide data for all of your team memebers.
Once you have completed building your team, CADRE will create an HTML file
that displays a nicely formatted team roster based on the information you provided.

Ther are three types to chose from:
        - Manager
        - Engineer
        - Intern

Let's get started!

`
);
    setTimeout( function () {
        newManager();
    }, 1500);
}


function newManager() {

    console.log(
`--------------------------------------------
Manager setup:`
    );

    inquirer
        .prompt([
            {
                type: "input",
                message: "Who will be your manager?",
                name: "name"
            },
            {
                type: "input",
                message: "What is their ID number?",
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
            engineerLoop();
        });

}

function engineerLoop() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to set up an engineer?",
                name: "needEng"
            }
        ])
        .then(function(response) {
            if (response.needEng === true) {
                console.log(
`--------------------------------------------
Engineer setup:`
                        );
                            
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is this engineer's name?",
                            name: "name"
                        },
                        {
                            type: "input",
                            message: "What is their ID number?",
                            name: "id"
                        },
                        {
                            type: "input",
                            message: "What is their E-mail address?",
                            name: "email"
                        },
                        {
                            type: "input",
                            message: "What is their GitHub username?",
                            name: "github"
                        }
                    ])
                    .then(function(response) {
                        const newEng = new Engineer(response.name, response.id, response.email, response.github);
                        employees.push(newEng);
                        engineerLoop();
                    });
            } else {
                internLoop();
            }
                
        });
    

}



function internLoop() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to set up an intern?",
                name: "needInt"
            }
        ])
        .then(function(response) {
            if (response.needInt === true) {
                console.log(
`--------------------------------------------
Intern setup:`
                        );
                            
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is this intern's name?",
                            name: "name"
                        },
                        {
                            type: "input",
                            message: "What is their ID number?",
                            name: "id"
                        },
                        {
                            type: "input",
                            message: "What is their E-mail address?",
                            name: "email"
                        },
                        {
                            type: "input",
                            message: "What school did they go to?",
                            name: "school"
                        }
                    ])
                    .then(function(response) {
                        const newInt = new Intern(response.name, response.id, response.email, response.school);
                        employees.push(newInt);
                        internLoop();
                    });
            } else {
                fs.copyFileSync("./templates/bootstrap.min.css", "./output/bootstrap.min.css");
                fs.copyFileSync("./templates/Myteam452.png", "./output/Myteam452.png");
                fs.writeFile(outputPath, render(employees), function(err) {

                    if (err) {
                      return console.log(err);
                    }
                  
                    console.log(
`

HTML file successfully created! The file will be stored in the 'output' folder. 

Thank you for using CADRE!
`
);
                    figlet('CADRE', function(err, data) {
                        if (err) {
                            console.log('Something went wrong...');
                            console.dir(err);
                            return;
                        }
                        console.log(data)
                    });
                  
                  });

            }
                
        });
    

}