import { Employee } from "./Employee";

export class EmployeeRepository{
    private  employees : Employee[] = [
        new Employee(1,202200697,'Nico Carinan','ACTIVE'),
        new Employee(2,20180929,'Rey-ann Gatela','INACTIVE')
    ];

    
    findAll(): Employee[]{
        return this.employees;
    }

    findOne(param : string | number) : Employee | undefined{
       return this.employees.find(employee =>
            typeof param === 'number'
                ? employee.id === param
                : employee.fullName === param
        );
    }
}