import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AccessSite, RootSite } from "../../model/model";

export interface ISharePointProps{
    context:WebPartContext
}
export interface ISharePointState{
    showForm:boolean;
    enableForm:boolean;
    selectManual:boolean;
    permission:string;
    selectedSite:string;
    allRootSites:RootSite[];
    accessSites:AccessSite[];
}