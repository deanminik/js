const employees = [
    {
        id: 1,
        name: 'Fernando'
    },
    {
        id: 2,
        name: 'Maria'
    },
    {
        id: 3,
        name: 'Pedro'
    }
];
const salaries = [
    {
        id: 1,
        salary: 1000
    },
    {
        id: 2,
        salary: 2000
    }
];

const getEmployee = (id, callback) => {
    const employee = employees.find(element => element.id === id)
    if (employee) {
        // return employee;
        callback(null, employee)
    } else {
        // return `The employee ${id} doesn't exist`;
        callback(`The employee ${id} doesn't exist`);
    }

}
const getSalary = (id, callback) => {

    const salary = salaries.find(element => element.id === id)
    if (salary) {

        callback(null, salary)
    } else {

        callback(`The salary ${id} doesn't exist`);
    }

}
const id = 5;

getEmployee(id, (err, employee) => {
    if (err) {
        console.log('Error')
        return console.log(err)
    }
    console.log('The employee exists')
    console.log(employee);
})

getSalary(id, (err, salary) => {
    if (err) {
        console.log('Error')
        return console.log(err)
    }
    console.log('The salary exists')
    console.log(salary);
})