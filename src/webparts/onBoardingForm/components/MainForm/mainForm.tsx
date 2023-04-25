import * as React from "react";
import "./mainForm.css";
import { IMainFormProps, IMainFormState } from './IMainForm';
import { DateTimePicker, DateConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { Services } from "../../services/services";
import { IPersonaProps, Icon } from "office-ui-fabric-react";
import { MainFormInfo } from "../../model/model";
export default class MainForm extends React.Component<IMainFormProps, IMainFormState>{
    service = new Services;
    constructor(props: IMainFormProps) {
        super(props);
        this.state = {
            formData: props.formData,
            allDepartments: [],
            allLocations: [],
            allRootSites: [],
        }
    }
    componentDidMount(): void {
        this.service.getLocations().then((locations) => {
            this.service.getDepartments().then((departments) => {
                this.setState({
                    allLocations: locations,
                    allDepartments: departments,
                    formData:this.props.formData,
                })
            })
        });
    }
    handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void {
        const id: string = event.target.id;
        const value: string = event.target.value;
        let newData: MainFormInfo;
        switch (id) {
            case "rbNewHire":
                newData = {
                    ...this.state.formData,
                    newHireOrTransfer: value,
                }
                break;
            case "rbTransfer":
                newData = {
                    ...this.state.formData,
                    newHireOrTransfer: value
                }
                break;
            case "rbFullTime":
                newData = {
                    ...this.state.formData,
                    employeeType: value,
                    contractDuration: "None"
                }
                break;
            case "rbConsultant":
                newData = {
                    ...this.state.formData,
                    employeeType: value,
                    contractDuration: "3 Months"
                }
                break;
            case "rbThreeMonths":
                newData = {
                    ...this.state.formData,
                    contractDuration: value
                }
                break;
            case "rbSixMonths":
                newData = {
                    ...this.state.formData,
                    contractDuration: value
                }
                break;
            case "tbConsultantFirm":
                    newData = {
                        ...this.state.formData,
                        consultantFirmName: value,
                    }
                break;
            case "tbFirstName":
                (this.checkAlphaNumeric(value)) ?
                    newData = {
                        ...this.state.formData,
                        firstName: value,
                    }
                    :
                    newData = {
                        ...this.state.formData
                    }
                break;
            case "tbLastName":
                (this.checkAlphaNumeric(value)) ?
                    newData = {
                        ...this.state.formData,
                        lastName: value
                    }
                    :
                    newData = {
                        ...this.state.formData
                    }
                break;
            case "tbEmployeeId":
                (this.checkAlphaNumeric(value)) ?
                    newData = {
                        ...this.state.formData,
                        employeeId: value
                    }
                    :
                    newData = {
                        ...this.state.formData,
                    }
                break;
            case "tbTitle":
                (this.checkAlphaNumeric(value)) ?
                    newData = {
                        ...this.state.formData,
                        title: value
                    }
                    :
                    newData = {
                        ...this.state.formData,
                    }
                break;
            case "ddlLocation":
                newData = {
                    ...this.state.formData,
                    location: value
                }
                break;
            case "ddlDepartment":
                newData = {
                    ...this.state.formData,
                    department: value
                }
                break;
        }
        this.setState({
            formData: newData,
        }, () => this.postFormData())

    }
    checkAlphaNumeric(value: string): boolean {
        const regex = /^[a-zA-Z0-9]*$/;
        return (regex.test(value));
    }
    formatDate(date: Date): string {
        return date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }).replace("/-/g", "/");
    }
    setDate(date: Date) {
        let newData = {
            ...this.state.formData,
            startDate: date
        };
        this.setState({
            // startDateError: false,
            formData: newData
        }, () => this.postFormData()
        )
    }
    setPersonId(personId: string) {
        let newData = {
            ...this.state.formData,
            personId: personId
        };
        this.setState({
            // personError: false,
            formData: newData
        }, () => this.postFormData()
        )
    }
    postFormData(): void {
        
            // hasError: !(!this.state.firstNameError && !this.state.lastNameError && !this.state.startDateError && !this.state.titleError && !this.state.departmentError && !this.state.employeeIdError && !this.state.locationError && !this.state.personError)
        this.props.setData(this.state.formData);
    }
    render(): React.ReactNode {
        return (
            <div className="row">
                <div className='div-formSectionHeader col-11 ml-2 mt-4 mb-2'><h3>Requesting For</h3></div>
                <div className='col-11 div-formSection'>
                    <div className='col-xs-12 col-sm-12 col-md-10'>
                        <div className="row mb-3">
                            <label htmlFor='divNewHireOrTransfer' className='control-label col-xs-12 col-sm-3 col-md-3'>New Hire (or) Transfer</label>
                            <div id='divNewHireOrTransfer' className='col-xs-12 col-sm-8 col-md-8'>
                                <label className="radio-inline">
                                    <input type='radio' className="mr-2" name='rblNewHireOrTransfer' id='rbNewHire'
                                        value='New Hire' checked={this.state.formData.newHireOrTransfer === "New Hire"} onChange={(event) => this.handleInputChange(event)} />
                                    New Hire
                                </label>
                                <label className="radio-inline ml-3">
                                    <input type='radio' className="mr-2" name='rblNewHireOrTransfer' id='rbTransfer'
                                        value='Transfer' checked={this.state.formData.newHireOrTransfer === "Transfer"} onChange={(event) => this.handleInputChange(event)} />
                                    Transfer
                                </label>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='divEmployeeType' className='control-label col-xs-12 col-sm-3 col-md-3 '>Employee Type</label>
                            <div id='divEmployeeType' className='col-xs-12 col-sm-8 col-md-8 '>
                                <label className='radio-inline'>
                                    <input type='radio' className="mr-2" name='rblEmployeeType' id='rbFullTime'
                                        value='Full Time' checked={this.state.formData.employeeType === "Full Time"} onChange={(event) => this.handleInputChange(event)} />
                                    Full Time
                                </label>
                                <label className="radio-inline ml-3">
                                    <input type='radio' className="mr-2" name='rblEmployeeType' id='rbConsultant'
                                        value='Consultant' checked={this.state.formData.employeeType === "Consultant"} onChange={(event) => this.handleInputChange(event)} />
                                    Consultant
                                </label>
                            </div>
                        </div>
                        {this.state.formData.employeeType === "Consultant" &&
                            <div>
                                <div className='row mb-3'>
                                    <label htmlFor='divContactDuration' className='control-label col-xs-12 col-sm-3 col-md-3 '>Contract Duration</label>
                                    <div id='divContactDuration' className='col-xs-12 col-sm-8 col-md-8 '>
                                        <label className='radio-inline'>
                                            <input type='radio' className="mr-2" name='rblContactDuration' id='rbThreeMonths'
                                                value='3 Months' checked={this.state.formData.contractDuration === "3 Months"} onChange={(event) => this.handleInputChange(event)} /> 3 Months
                                        </label>
                                        <label className="radio-inline ml-3">
                                            <input type='radio' className="mr-2" name='rblContactDuration' id='rbSixMonths'
                                                value='6 Months' checked={this.state.formData.contractDuration === "6 Months"} onChange={(event) => this.handleInputChange(event)} /> 6 Months
                                        </label>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <label
                                        className={`control-label col-xs-12 col-sm-3 col-md-3`}
                                        htmlFor='tbConsultantFirm'>Consultant Firm</label>
                                    <div className="col-xs-11 col-sm-8 col-md-8 pr-2">
                                        <input type='text' className={`form-control`}
                                            id='tbConsultantFirm' value={this.state.formData.consultantFirmName}
                                            placeholder='Consultant Firm' onChange={(event) => this.handleInputChange(event)} />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={`row mb-2 ${this.props.isSubmitClicked?this.props.formErrors.startDateError?"start-date-danger":"start-date-success":""}`}>
                            <label className={`control-label col-xs-12 col-sm-3 col-md-3 ${this.props.isSubmitClicked ? this.props.formErrors.startDateError ? "text-danger" : "text-success" : ""}`}>Start Date</label>
                            <div className="col-xs-12 col-sm-8 col-md-8 pr-2 border-primary start-date-inner">
                                <DateTimePicker showLabels={false}
                                    dateConvention={DateConvention.Date}
                                    isMonthPickerVisible={false}
                                    minDate={new Date()}
                                    formatDate={(date: Date) => this.formatDate(date)}
                                    onChange={(date: Date) => this.setDate(date)}
                                    value={this.state.formData.startDate}
                                />
                            </div>
                            <div className="col-xs-1 pt-2">
                                {this.props.isSubmitClicked ?
                                    this.props.formErrors.startDateError
                                        ? <Icon iconName="Clear" className="text-danger" />
                                        : <Icon iconName="AcceptMedium" className="text-success" />
                                    : <Icon iconName="AsteriskSolid" />
                                }
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <label
                                className={`control-label col-xs-12 col-sm-3 col-md-3 ${this.props.isSubmitClicked ? this.props.formErrors.firstNameError ? "text-danger" : "text-success" : ""}`}
                                htmlFor='tbFirstName'>First Name</label>
                            <div className="col-xs-11 col-sm-8 col-md-8 pr-2">
                                <input type='text' className={`form-control ${this.props.isSubmitClicked ? this.props.formErrors.firstNameError ? "border-danger" : "border-success" : ""}`}
                                    id='tbFirstName' value={this.state.formData.firstName}
                                    placeholder='First Name' onChange={(event) => this.handleInputChange(event)} />
                            </div>
                            <div className="col-xs-1 pt-2">
                                {this.props.isSubmitClicked ?
                                    this.props.formErrors.firstNameError
                                        ? <Icon iconName="Clear" className="text-danger" />
                                        : <Icon iconName="AcceptMedium" className="text-success" />
                                    : <Icon iconName="AsteriskSolid" />
                                }
                            </div>
                        </div>
                        <div className='row mb-2 '>
                            <label
                                className={`control-label col-xs-12 col-sm-3 col-md-3 ${this.props.isSubmitClicked ? this.props.formErrors.lastNameError ? "text-danger" : "text-success" : ""}`}
                                htmlFor='tbLastname'>Last Name</label>
                            <div className="col-xs-11 col-sm-8 col-md-8 pr-2">
                                <input type='text' className={`form-control ${this.props.isSubmitClicked ? this.props.formErrors.lastNameError ? "border-danger" : "border-success" : ""}`}
                                    id='tbLastName' value={this.state.formData.lastName}
                                    placeholder='Last Name' onChange={(event) => this.handleInputChange(event)} />
                            </div>
                            <div className="col-xs-1 pt-2">
                                {this.props.isSubmitClicked ?
                                    this.props.formErrors.lastNameError
                                        ? <Icon iconName="Clear" className="text-danger" />
                                        : <Icon iconName="AcceptMedium" className="text-success" />
                                    : <Icon iconName="AsteriskSolid" />
                                }
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <label
                                className={`control-label col-xs-12 col-sm-3 col-md-3 ${this.props.isSubmitClicked ? this.props.formErrors.employeeIdError ? "text-danger" : "text-success" : ""}`}
                                htmlFor='tbEmployeeId'>Employee ID</label>
                            <div className="col-xs-11 col-sm-8 col-md-8 pr-2">
                                <input type='text' className={`form-control ${this.props.isSubmitClicked ? this.props.formErrors.employeeIdError ? "border-danger" : "border-success" : ""}`}
                                    id='tbEmployeeId' value={this.state.formData.employeeId}
                                    placeholder='Employee Id' onChange={(event) => this.handleInputChange(event)} />
                            </div>
                            <div className="col-xs-1 pt-2">
                                {this.props.isSubmitClicked ?
                                    this.props.formErrors.employeeIdError
                                        ? <Icon iconName="Clear" className="text-danger" />
                                        : <Icon iconName="AcceptMedium" className="text-success" />
                                    : <Icon iconName="AsteriskSolid" />
                                }
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <label
                                className={`control-label col-xs-12 col-sm-3 col-md-3 ${this.props.isSubmitClicked ? this.props.formErrors.titleError ? "text-danger" : "text-success" : ""}`}
                                htmlFor='tbTitle'>Title</label>
                            <div className="col-xs-11 col-sm-8 col-md-8 pr-2">
                                <input type='text' className={`form-control ${this.props.isSubmitClicked ? this.props.formErrors.titleError ? "border-danger" : "border-success" : ""}`}
                                    id='tbTitle' value={this.state.formData.title}
                                    placeholder='Title' onChange={(event) => this.handleInputChange(event)} />
                            </div>
                            <div className="col-xs-1 pt-2">
                                {this.props.isSubmitClicked ?
                                    this.props.formErrors.titleError
                                        ? <Icon iconName="Clear" className="text-danger" />
                                        : <Icon iconName="AcceptMedium" className="text-success" />
                                    : <Icon iconName="AsteriskSolid" />
                                }
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <label
                                className={`control-label col-xs-12 col-sm-3 col-md-3 ${this.props.isSubmitClicked ? this.props.formErrors.personError ? "text-danger" : "text-success" : ""}`}
                            >Manager</label>
                            <div className={`col-xs-11 col-sm-8 col-md-8 pr-2 ${this.props.isSubmitClicked ? this.props.formErrors.personError ? "people-danger" : "people-success" : ""}`}>
                                <PeoplePicker
                                    placeholder="Enter a name or email address..."
                                    context={this.props.context as any}
                                    personSelectionLimit={1}
                                    principalTypes={[PrincipalType.User]}
                                    ensureUser={true}
                                    suggestionsLimit={50}
                                    defaultSelectedUsers={[this.state.formData.personEmail]}
                                    onChange={(person: IPersonaProps[]) => {
                                        this.setPersonId(person[0].id)
                                    }
                                    }

                                />
                            </div>
                            <div className="col-xs-1 pt-2">
                                {this.props.isSubmitClicked ?
                                    this.props.formErrors.personError
                                        ? <Icon iconName="Clear" className="text-danger" />
                                        : <Icon iconName="AcceptMedium" className="text-success" />
                                    : <Icon iconName="AsteriskSolid" />
                                }
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <label
                                className={`control-label col-xs-12 col-sm-3 col-md-3 ${this.props.isSubmitClicked ? this.props.formErrors.locationError ? "text-danger" : "text-success" : ""}`}
                                htmlFor="ddlLocation">Location</label>
                            <div className="col-xs-11 col-sm-8 col-md-8 pr-2">
                                <select className={`form-control ${this.props.isSubmitClicked ? this.props.formErrors.locationError ? "border-danger" : "border-success" : ""}`}
                                    id="ddlLocation"
                                    value={this.state.formData.location} onChange={(event) => this.handleInputChange(event)}>
                                    <option value="-1">None</option>
                                    {this.state.allLocations.map((location) => <option value={location.Id} key={location.Id}>{location.LocationName}</option>)}
                                </select>
                            </div>
                            <div className="col-xs-1 pt-2">
                                {this.props.isSubmitClicked ?
                                    this.props.formErrors.locationError
                                        ? <Icon iconName="Clear" className="text-danger" />
                                        : <Icon iconName="AcceptMedium" className="text-success" />
                                    : <Icon iconName="AsteriskSolid" />
                                }
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <label
                                className={`control-label col-xs-12 col-sm-3 col-md-3 ${this.props.isSubmitClicked ? this.props.formErrors.departmentError ? "text-danger" : "text-success" : ""}`}
                                htmlFor="ddlDepartment">Department</label>
                            <div className="col-xs-11 col-sm-8 col-md-8 pr-2">
                                <select className={`form-control ${this.props.isSubmitClicked ? this.props.formErrors.departmentError ? "border-danger" : "border-success" : ""}`}
                                    id="ddlDepartment"
                                    value={this.state.formData.department} onChange={(event) => this.handleInputChange(event)}>
                                    <option value="-1">None</option>
                                    {this.state.allDepartments.map((department) => <option value={department.Id} key={department.Id}>{department.DepartmentName}</option>)}
                                </select>
                            </div>
                            <div className="col-xs-1 pt-2">
                                {this.props.isSubmitClicked ?
                                    this.props.formErrors.departmentError
                                        ? <Icon iconName="Clear" className="text-danger" />
                                        : <Icon iconName="AcceptMedium" className="text-success" />
                                    : <Icon iconName="AsteriskSolid" />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}