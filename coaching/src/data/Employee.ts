export class Employee {
    public id : number;
    public employeeID: number;
    public fullName : string;
    public status : 'ACTIVE' | 'INACTIVE'
    constructor(id : number, employeeID: number, fullname : string, status : 'ACTIVE' | 'INACTIVE' ){
        this.id = id;
        this.employeeID = employeeID;
        this.fullName = fullname;
        this.status = status;
    }
}