const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const inquirer = require("inquirer");
// So that prompts can be used
const prompt = inquirer.createPromptModule();

// Empty array for workers
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Questions array
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

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

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

const engineer = {
    type: "input",
    message: "GitHub username?",
    name: "github"
}

const intern = {
    type: "input",
    message: "School?",
    name: "school"
}

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// Function to initiate the program, and start with the manager
function init() {
    prompt([
        ...questions, manager
    ]).then(({name, id, email, office}) => {
        let manager = new Manager(name, id, email, office);
        // Blank answers not accepted
        if (name !== "" && id !== "" && office !== "") {
            // Push manager to employees array
            employees.push(manager);
            // Call function for more team members: the engineers and interns
            makeWorkers();
        };
    });
};

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// Function to add team members to team.html
function makeWorkers() {
    prompt(workerType).then((data) => {
        if (data.role === "Engineer") {
            makeEngineer();
        } else if (data.role === "Intern") {
            makeIntern();
        } else {
            writeToFile("./output/team.html", render(employees));
        };
    });
};

// Function to add an engineer to the team
function makeEngineer() {
    prompt([
        ...questions, engineer
    ]).then(({name, id, email, github}) => {
        let engineer = new Engineer(name, id, email, github);
        if (name !== "" && id !== "" && email !== "" && github !== "") {
            // Push engineer to employees array
            employees.push(engineer);
            makeWorkers();
        } else {
            console.log("Try again");
            makeEngineer();
        };
    });
};

// Function to add an intern to the team
function makeIntern() {
    prompt([
        ...questions, intern
    ]).then(({name, id, email, school}) => {
        let intern = new Intern(name, id, email, school);
        if (name !== "" && id !== "" && email !== "" && school !== "") {
            // Push intern to employees array
            employees.push(intern);
            makeWorkers();
        } else {
            console.log("Try again");
            makeIntern();
        };
    });
};

// Function to write the HTML file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            throw err;
        };
        console.log("success");
    });
};

// Function call to initiate program
init();