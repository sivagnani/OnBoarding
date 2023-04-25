export interface Location {
    Id: string;
    LocationName: string;
}
export interface Department {
    Id: string;
    DepartmentName: string;
}
export interface RootSite {
    Id: string;
    Title: string;
}
export interface AccessSite {
    Id: string;
    Title: string;
    Permission: string;
}
export interface MainFormInfo {
    newHireOrTransfer: string;
    employeeType: string;
    contractDuration: string;
    consultantFirmName: string;
    startDate: Date;
    personId: string;
    personEmail: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    title: string;
    location: string;
    department: string;
}
export interface MainFormError {
    startDateError: boolean,
    firstNameError: boolean,
    lastNameError: boolean,
    personError: boolean,
    employeeIdError: boolean,
    titleError: boolean,
    locationError: boolean,
    departmentError: boolean,
}