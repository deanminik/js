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


const getInfoUser = async (id) => {
    try {
        const employee = await getEmployee(id);
        const salary = await getSalary(id);

        return `The salary of the ${employee.name} is ${salary.salary}`;
    } catch (error) {
        throw error;// calls the reject of the promise function 
    }

}

const id = 10;
getInfoUser(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));