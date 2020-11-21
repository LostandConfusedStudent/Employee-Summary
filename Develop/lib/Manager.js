// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// extend employee
const Employee = require("./Employee");

class Manager extends Employee {
    constructor (name, id, email, office) {
        super (name, id, email);
        this.office = office;
    }
    getRole() {
        const role = "Manager";
        return role;
    }
    getOffice() {
        const office = this.office;
        return office;
    }
}

module.exports = Manager;