import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MainFormError, MainFormInfo } from "../model/model";
export interface IOnBoardingFormState {
  isSubmitted:boolean;
  mainFormData:MainFormInfo;
  mainFormErrors:MainFormError;
  hasError:boolean;
}
export interface IOnBoardingFormProps {
  context: WebPartContext;  
}
