import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import styles from './OnBoardingForm.module.scss';
import { IOnBoardingFormProps, IOnBoardingFormState } from './IOnBoardingFormProps';
import FormHeader from './FormHeader/formHeader';
import MainForm from './MainForm/mainForm';
import MobileAccessRequest from './MobileAccountRequest/mobileAccessRequest';
import ApplicationOrHardwareRequest from './ApplicationOrHardwareRequest/applicationOrHardwareRequest';
import SharePointRequest from './SharePoint Request/sharePointRequest';
import { MainFormInfo } from '../model/model';
import { Services } from '../services/services';

export default class OnBoardingForm extends React.Component<IOnBoardingFormProps, IOnBoardingFormState> {
  service = new Services;
  constructor(props: IOnBoardingFormProps) {
    super(props);
    this.state = {
      isSubmitted: false,
      mainFormData: {
        newHireOrTransfer: "New Hire",
        employeeType: "Full Time",
        contractDuration: "None",
        consultantFirmName: "",
        startDate: null,
        firstName: "",
        lastName: "",
        personId: "",
        personEmail: "",
        employeeId: "",
        title: "",
        location: "-1",
        department: "-1",
      },
      mainFormErrors: {
        startDateError: true,
        firstNameError: true,
        lastNameError: true,
        personError: true,
        employeeIdError: true,
        titleError: true,
        locationError: true,
        departmentError: true,
      },
      hasError:true
    }
  }
  componentDidMount(): void {
    this.service.decodeQuery(this.props.context).then((data) => {
      this.setState({
        mainFormData: data,
      })
    });
  }
  setSubmit(): void {
    this.setState({
      isSubmitted:true,
      mainFormErrors: {
        firstNameError: this.checkValid(this.state.mainFormData.firstName),
        lastNameError: this.checkValid(this.state.mainFormData.lastName),
        employeeIdError: this.checkValid(this.state.mainFormData.employeeId),
        titleError: this.checkValid(this.state.mainFormData.title),
        locationError: (this.state.mainFormData.location === "-1"),
        departmentError: (this.state.mainFormData.department === "-1"),
        personError: this.checkValid(this.state.mainFormData.personId),
        startDateError: this.checkValid(this.state.mainFormData.startDate)
      }
    },()=>{
      let hasError=!(!this.state.mainFormErrors.firstNameError && !this.state.mainFormErrors.lastNameError && !this.state.mainFormErrors.startDateError && 
        !this.state.mainFormErrors.titleError && !this.state.mainFormErrors.departmentError && !this.state.mainFormErrors.employeeIdError && !this.state.mainFormErrors.locationError && 
        !this.state.mainFormErrors.personError);
      this.setState({
        hasError:hasError
      })
    if (hasError) {
      window.alert("Please fill all the required fields.");
    }
    else {
      this.service.addOnBoardRequest(this.props.context, this.state.mainFormData).then((status) => {
        if (status) {
          window.alert("Successfully Added");
          this.setState({
            isSubmitted: false
          })
        }
        else {
          window.alert("Fail");
        }
      });
    }})
  }
  checkValid(value: any): boolean {
    return (value) ? false : true;
  }
  getFormData(data: MainFormInfo): any {
    this.setState({
      mainFormData: data
    })
  }
  public render(): React.ReactElement<IOnBoardingFormProps> {
    return (
      <div>
        <FormHeader />
        <div>
          <MainForm formData={this.state.mainFormData} formErrors={this.state.mainFormErrors} context={this.props.context} isSubmitClicked={this.state.isSubmitted} setData={(data: MainFormInfo) => this.getFormData(data)} />
          <MobileAccessRequest />
          <ApplicationOrHardwareRequest />
          <SharePointRequest context={this.props.context} />
          <hr />
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-10 p-2 d-flex justify-content-end'>
              <button id='btnSubmitForm' type="button" className="btn btn-success pull-right" onClick={() => this.setSubmit()}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
