import * as React from "react";
import './sharePointRequest.css';
import { ISharePointProps, ISharePointState } from './ISharePointRequest';
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Services } from "../../services/services";
// import { SitePicker } from "@pnp/spfx-controls-react/lib/SitePicker";
export default class SharePointRequest extends React.Component<ISharePointProps, ISharePointState>{
    service = new Services();
    constructor(props: ISharePointProps) {
        super(props);
        this.state = {
            showForm: false,
            enableForm: false,
            selectManual: true,
            permission: "Contribute",
            selectedSite: "-1",
            allRootSites: [],
            accessSites: [],
        }
    }
    componentDidMount(): void {
        this.service.getRootSites().then((rootSites) => {
            let allSites = rootSites.map(item => {
                return {
                    Id: item.Id,
                    Title: `${item.Title}-${item.TitleLevel2}`
                };
            })
            this.setState({
                allRootSites: allSites
            })
        }
        );
    }
    toggleFormSection(): void {
        this.setState({
            showForm: !this.state.showForm,
        })
    }
    handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>): void {
        const id: string = event.target.id;
        const value: string = event.target.value;
        switch (id) {
            case "rbYes":
                this.setState({
                    enableForm: value === "Yes"
                });
                break;
            case "rbNo":
                this.setState({
                    enableForm: value === "Yes"
                });
                break;
            case "ddlSiteAccessLevel":
                this.setState({
                    selectManual: value === "0"
                });
                break;
            case "rbContribute":
                this.setState({
                    permission: value
                });
                break;
            case "rbReadOnly":
                this.setState({
                    permission: value
                });
                break;
            case "ddlSites":
                this.setState({
                    selectedSite: value
                })

        }
    }
    addAccessSite() {
        const activeSite = this.state.selectedSite;
        if (activeSite !== "-1" && (this.state.accessSites.filter((site) => site.Id === activeSite).length === 0)) {
            let accessSites = JSON.parse(JSON.stringify(this.state.accessSites));
            let title = this.state.allRootSites.filter((site) => String(site.Id) === activeSite)[0].Title
            accessSites.push({
                Id: activeSite,
                Title: title,
                Permission: this.state.permission
            })
            this.setState({
                accessSites: accessSites
            })
        }
    }
    deleteAccessSite(id: string) {
        let accessSites = this.state.accessSites.filter((site) => site.Id !== id);
        this.setState({
            accessSites: accessSites
        })
    }
    render(): React.ReactNode {
        return (
            <div className="row">
                <div className='div-formSectionHeader d-flex align-items-center cursor-pointer p-0' onClick={() => this.toggleFormSection()}>
                    <Icon iconName={this.state.showForm ? "TriangleSolidDown12" : "TriangleSolidRight12"} className="formHeaderIcon" />
                    <h3 className="ml-2">SharePoint Request</h3>
                </div>
                <div className={`formSection ${this.state.showForm ? "active  div-formSection pl-3 pr-4 col-11" : ""}`}>
                    <div className="row ml-0">
                        <div className='col-xs-12 col-sm-12 col-md-10'>
                            <div className="row mb-3">
                                <label htmlFor='divNeedSpsite' className='control-label col-xs-12 col-sm-2 col-md-3'>Need a SharePoint Site</label>
                                <div id='divNeedSpsite' className='col-xs-12 col-sm-9 col-md-8'>
                                    <label className="radio-inline">
                                        <input type='radio' className="mr-2" name='rblNeedSpsite'
                                            id='rbYes' value='Yes' checked={this.state.enableForm} onChange={(event) => this.handleInputChange(event)} /> Yes
                                    </label>
                                    <label className="radio-inline ml-3">
                                        <input type='radio' className="mr-2" name='rblNeedSpsite'
                                            id='rbNo' value='No' checked={!this.state.enableForm} onChange={(event) => this.handleInputChange(event)} /> No
                                    </label>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <label className='control-label col-xs-12 col-sm-2 col-md-3 ' htmlFor="ddlSiteAccessLevel">How would you define the access levels needed ?</label>
                                <div className="col-xs-11 col-sm-9 col-md-8 ">
                                    <select className="form-control" id="ddlSiteAccessLevel" onChange={(event) => this.handleInputChange(event)} disabled={!this.state.enableForm}>
                                        <option value="0">Manually select sites and access levels</option>
                                        <option value="1">Select a profile with similar access levels</option>
                                    </select>
                                </div>
                            </div>
                            {this.state.selectManual ?
                                <div id="divManualSitePermission" className='row mb-4 p-2 '>
                                    <label className='control-label col-xs-12 col-sm-2 col-md-3 ' htmlFor='ddlSites'>
                                        Access For
                                    </label>
                                    <div className="col-xs-11 col-sm-9 col-md-8">
                                        <div className="row border-bottom">
                                            <div className="col-7 px-1">
                                                <label className="control-label">Sites</label>
                                            </div>
                                            <div className="col-4 px-1">
                                                <label className="control-label">Permissions</label>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-7 px-1">
                                                <div className="row">
                                                    <div className="col-12"><label className="control-label">Root Sites:</label></div>
                                                    <div className="col-12">
                                                        <select className="form-control" id="ddlSites" disabled={!this.state.enableForm}
                                                            onChange={(event) => this.handleInputChange(event)}>
                                                            <option value="-1">None</option>
                                                            {this.state.allRootSites.map((rootSite) => <option value={rootSite.Id} key={rootSite.Id}>{rootSite.Title}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="row pt-2 pl-2">
                                                    <div>
                                                        <label><input type="radio" value='Contribute'
                                                            name="rblSitePermission" className="mr-1 " id="rbContribute" checked={this.state.permission === "Contribute"}
                                                            disabled={!this.state.enableForm} onChange={(event) => this.handleInputChange(event)} />Contribute</label>
                                                        <br></br>
                                                        <label><input type="radio" value='ReadOnly'
                                                            name="rblSitePermission" className="mr-1" id="rbReadOnly" checked={this.state.permission === "ReadOnly"}
                                                            onChange={(event) => this.handleInputChange(event)} disabled={!this.state.enableForm} />ReadOnly</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2 align-center pt-4 px-1">
                                                <button id='btnAddSitePermission' type="button" className="btn btn-success w-100"
                                                    onClick={() => this.addAccessSite()} disabled={!this.state.enableForm}>Add</button>
                                            </div>
                                        </div>
                                        {this.state.accessSites.length !== 0 &&
                                            <div className="row border-top mt-3">
                                                <caption className="">Access For</caption>
                                            </div>
                                        }
                                        <table className="w-100 table">
                                            <tbody>
                                                {this.state.accessSites.map((site) =>
                                                    <tr className="align-items-center div-AccessFor bt-1">
                                                        <td className="m-0 p-1 text-center">{site.Title}</td>
                                                        <td className="m-0 p-1">{site.Permission}</td>
                                                        <td className="m-0 p-1"><Icon iconName="Clear" onClick={() => this.deleteAccessSite(site.Id)} className="cursor-pointer pt-1" /></td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                <div className='row mb-2'>
                                    <label className="control-label col-xs-12 col-sm-3 col-md-3">Similar access to the profile</label>
                                    <div className="col-xs-11 col-sm-8 col-md-8 pr-2">
                                        <PeoplePicker
                                            placeholder="Enter a name or email address..."
                                            context={this.props.context as any}
                                            personSelectionLimit={1}
                                            principalTypes={[PrincipalType.User]}
                                            suggestionsLimit={50}
                                            disabled={!this.state.enableForm}
                                        />
                                    </div>
                                    <div className="col-xs-1 pt-2">
                                        <Icon iconName="AsteriskSolid" />
                                    </div>
                                </div>
                            }
                            <div className='row'>
                                <label className='control-label col-xs-12 col-sm-2 col-md-3' htmlFor='taSitePermissionComment'>Comments</label>
                                <div className="col-xs-11 col-sm-9 col-md-8 ">
                                    <textarea className="form-control" disabled={!this.state.enableForm} rows={3} id="taSitePermissionComment"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}