import { Department, Location, MainFormInfo } from '../model/model';
import { IServices } from './IServices';
import { IWeb, Web } from "@pnp/sp/webs";
import '@pnp/sp/site-users';
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from "@pnp/sp";
import { WebPartContext } from '@microsoft/sp-webpart-base';
export class Services implements IServices {
    context: IWeb = Web("https://digitalrealty.sharepoint.com/sites/OnboardingForm");
    rootSiteContext: IWeb = Web("https://digitalrealty.sharepoint.com");
    getLocations(): Promise<Location[]> {
        return this.context.lists.getByTitle("DLR Locations").items.select('Id', 'LocationName').orderBy('LocationName').top(1000).get();
    }
    getDepartments(): Promise<Department[]> {
        return this.context.lists.getByTitle("DLR Departments").items.select('Id', 'DepartmentName').orderBy('DepartmentName').top(1000).get()
            .then((departments: Department[]) =>
                departments.map((department: Department) => {
                    const str = department.DepartmentName;
                    const sub = str.substring(str.lastIndexOf("<") + 1, str.lastIndexOf(">"));
                    if (sub) {
                        department.DepartmentName = str.replace("<" + sub + ">", "").trim();
                    }
                    return department;
                }));
    }
    async addOnBoardRequest(context: WebPartContext, formData: MainFormInfo): Promise<boolean> {
        sp.setup({
            spfxContext: context as any
        });
        let requestorId = (await sp.web.currentUser.get()).Id;
        const userName = formData.firstName + " " + formData.lastName
        return this.context.lists.getByTitle("DLROnBoardingForm").items.add({
            EmployeeId: formData.employeeId,
            Title: userName,
            FirstName: formData.firstName,
            LastName: formData.lastName,
            JobTitle: formData.title,
            Reason: formData.newHireOrTransfer,
            EmployeeType: formData.employeeType,
            StartDate: formData.startDate,
            ContactDuration: formData.contractDuration,
            DepartmentId: formData.department,
            LocationId: formData.location,
            ManagerId: formData.personId,
            RequestorId: requestorId
        }).then(() => true).catch(() => false)
    }
    getRootSites(): Promise<any[]> {
        return this.rootSiteContext.lists.getByTitle("TopNavigation").items.select('Id', 'Title', 'TitleLevel2').get();
    }
    decodeQuery(context:WebPartContext):Promise<MainFormInfo>{
        sp.setup({
            spfxContext: context as any
        });
        let regex = new RegExp("[\\?&]query=([^&#]*)");
        let results = regex.exec(location.search);
        let formData:MainFormInfo={
            newHireOrTransfer: "New Hire",
                employeeType: "Full Time",
                contractDuration: "None",
                consultantFirmName: "",
                startDate: null,
                firstName: "",
                lastName: "",
                personId: "",
                personEmail:"",
                employeeId: "",
                title: "",
                location: "-1",
                department: "-1",
        }
        const result = (results == null) ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
        if (result) {
            var queryString = window.atob(result).split(";");
            return Promise.all(queryString.map(async (param) => {
                let [key, value] = param.split("=");
                switch (key) {
                    case "fn":
                        formData = {
                            ...formData,
                            firstName: value
                        };
                        break;
                    case "ln":
                        formData = {
                            ...formData,
                            lastName: value
                        };
                        break;
                    case "sd":
                        formData = {
                            ...formData,
                            startDate: new Date(value)
                        };
                        break;
                    case "tl":
                        formData = {
                            ...formData,
                            title: value
                        };
                        break;
                    case "mgr":
                        await sp.web.siteUsers.getByEmail(value).get().then((user) => formData = {
                            ...formData,
                            personEmail: value,
                            personId: user.Id.toString()
                        });
                        break;
                    case "loc":
                        await this.getLocations().then((locations) => formData = {
                            ...formData,
                            location: locations.filter((location) => location.LocationName.indexOf(value) >= 0)[0].Id
                        }
                        );
                        
                        break;
                    case "dept":
                        formData = {
                            ...formData,
                            department: value
                        };
                        break;
                    case "et":
                        if (value.toLowerCase() ==="cwk") {
                            formData = {
                                ...formData,
                                employeeType: "Consultant",
                                contractDuration: "3 Months"
                            };
                        }
                        else {
                            formData = {
                                ...formData,
                                employeeType: "Full Time",
                                contractDuration: "None"
                            };
                        }
                        
                        break;
                    case "cf":
                        formData = {
                            ...formData,
                            consultantFirmName: value
                        };
                        break;
                    case "eid":
                        formData = {
                            ...formData,
                            employeeId: value
                        };
                        break;
                }
            })).then(()=>(formData)
            )
        }
        else{
            return Promise.resolve(formData);
        }       
    }
}
