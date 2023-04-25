import * as React from "react";
import './mobileAccessRequest.css';
import { IMobileAccessRequestProps, IMobileAccessRequestState } from './IMobileAccessRequest';
import { Icon } from "office-ui-fabric-react/lib/Icon";
export default class MobileAccessRequest extends React.Component<IMobileAccessRequestProps, IMobileAccessRequestState>{
    constructor(props:IMobileAccessRequestProps){
        super(props);
        this.state={
            showForm:false,
        }
    }
    toggleFormSection():void{
        this.setState({
            showForm:!this.state.showForm,
        })
    }
    render(): React.ReactNode {
        return (
            <div className="row">
                <div className='div-formSectionHeader d-flex align-items-center cursor-pointer p-0' onClick={()=>this.toggleFormSection()}>
                    <Icon iconName={this.state.showForm?"TriangleSolidDown12":"TriangleSolidRight12"} className="formHeaderIcon"/>
                    <h3 className="ml-2">Mobile Access Request</h3>
                </div>
                <div className={`formSection ${this.state.showForm?"active  div-formSection pl-3 pr-4 col-11":""}`}>
                For Mobility requests, please click on the following link,
                <a href="https://interxion.service-now.com/sp?id=sc_cat_item_guide&amp;sys_id=17d22d161bf6101030f60dc8cd4bcbe6&amp;sysparm_category=1eaf43c8db183f00fd586c16ca96194d" target="_blank" 
                className="text-primary"> Mobile Device (Hardware request) </a>
                (this will open in a separate window) and fill out the required information indicated by the 
                <span className="text-danger"> * </span>
                symbol.
                </div>
            </div>
        );
    }
}