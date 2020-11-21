const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const prompt = inquirer.createPromptModule();
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


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

const questions = [{
    type: "input",
    message: "What's your name?",
    name: "name"
}, {
    type: "input",
    message: "What's your identification?",
    name: "id"
}, {
    type: "input",
    message: "What's your email?",
    name: "email"
}];

const manager = {
    type: "number",
    message: "What's your office number?",
    name: "office"
}

const workerType = [{
    type: "list",
    message: "Add a team member?",
    name: "role",
    choices: [
        "Engineer",
        "Intern",
        "No more"
    ]
}];

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// Function to initiate the program
function init() {
    prompt([
        ...questions,
        manager
    ]).then(({name, id, email, office}) => {
        let manager = new Manager(name, id, email, office);
        // Blank answers not accepted
        if (name !== "" && id !== "" && office !== "") {
            // Push to employees array
            employees.push(manager);
            makeWorkers();
        };
    });
};

function makeWorkers() {
    prompt(workerType).then((data) => {
        if (data.role === "engineer") {
            engineer();
        } else if (data.role === "intern") {
            intern();
        } else {
            writeToFile("./output/team.html", render(employees));
        };
    });
};

// Function to write the HTML file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            throw err;
        }
        console.log("success");
    });
};

// Function call to initiate program
init();