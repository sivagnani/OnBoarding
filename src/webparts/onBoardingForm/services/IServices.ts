import { Department, Location } from "../model/model";
export interface IServices{
    getLocations():Promise<Location[]>;
    getDepartments():Promise<Department[]>;
    // getContactsFromList(spHttpClient:SPHttpClient,siteUrl:string): Promise<Contact[]>;
    // insertContact(spHttpClient:SPHttpClient,siteUrl:string,contact:Contact):Promise<boolean>;
    // deleteContactById(spHttpClient:SPHttpClient,siteUrl:string,id:number):Promise<boolean>;
    // updateContact(newContact:Contact,spHttpClient:SPHttpClient,siteUrl:string):Promise<boolean>;
}