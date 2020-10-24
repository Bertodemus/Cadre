// TODO: Write code to define and export the Employee class
class Employee {

    constructor (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    }

    // printInfo() {
    //     console.log(`name: ${this.name}`);
    //     console.log(`ID: ${this.id}`);
    //     console.log(`Email: ${this.email}`);
    //     console.log(`Role: ${this.role}`);
    //   }

}


// const shape = new Employee("Ted", 001, "ted@ted.com");

// shape.printInfo();


module.exports = Employee;