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

const id = 10;

const getEmployee = (id) => {

    return new Promise((resolve, reject) => {

        const employee = employees.find(element => element.id === id);

        (employee) ? resolve(employee) : reject(`The employee ${id} doesn't exist`);
    });

}
const getSalary = (id) => {
    return new Promise((resolve, reject) => {
        const salary = salaries.find(element => element.id === id);
        (salary) ? resolve(salary) : reject(`The salary ${id} doesn't exist`);
    });
}

// getEmployee(id)
//     .then(employee => console.log(employee))
//     .catch(err => console.log(err));

// getSalary(id)
//     .then(salary => console.log(salary))
//     .catch(err => console.log(err));

let name;
getEmployee(id)
    .then(employee => {
        name = employee;
        return getSalary(id)
    })
    .then(salary => console.log('The employee: ', name.name, ' has a salary of: ', salary.salary))
    .catch(err => console.log(err));