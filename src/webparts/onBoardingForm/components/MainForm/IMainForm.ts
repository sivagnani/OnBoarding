import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Department, Location, MainFormError, MainFormInfo, RootSite } from "../../model/model";
export interface IMainFormProps{
    context: WebPartContext;
    isSubmitClicked:boolean;
    setData:(data:MainFormInfo)=>any; 
    formData:MainFormInfo;
    formErrors:MainFormError;
}
export interface IMainFormState{
    formData:MainFormInfo;
    allLocations:Location[];
    allDepartments:Department[];
    allRootSites:RootSite[];
}