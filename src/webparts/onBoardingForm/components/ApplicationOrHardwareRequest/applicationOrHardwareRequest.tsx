import * as React from "react";
import { IApplicationOrHardwareRequestrops,IApplicationOrHardwareRequestState} from './IApplicationOrHardwareRequest';
import { Icon } from "office-ui-fabric-react/lib/Icon";
export default class ApplicationOrHardwareRequest extends React.Component<IApplicationOrHardwareRequestrops, IApplicationOrHardwareRequestState>{
    constructor(props:IApplicationOrHardwareRequestrops){
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
                <div className='div-formSectionHeader d-flex align-items-center cursor-pointer col-12 p-0' onClick={()=>this.toggleFormSection()}>
                    <Icon iconName={this.state.showForm?"TriangleSolidDown12":"TriangleSolidRight12"} className="formHeaderIcon"/>
                    <h3 className="ml-2">Application / Hardware Request</h3>
                </div>
                <div className={`formSection ${this.state.showForm?"active div-formSection pl-3 pr-4":""}`}>
                    <p className="mb-4">For Hardware, Systems Access, or Software needs, please use the appropriate form: </p>
                    <a href="https://interxion.service-now.com/esc?id=sc_cat_item&amp;sys_id=655757704faef6c0a3b1bc218110c790" 
                    target="_blank" className="text-primary mb-1 d-block">Hardware request form</a>
                    <a href="https://interxion.service-now.com/sp?id=sc_cat_item&amp;sys_id=b418cb731bbb0890673bbaecdc4bcb14&amp;sysparm_category=8c2353e9dbd43300fd586c16ca96195a" 
                    target="_blank" className="text-primary mb-1 d-block">Systems Access request form</a>
                    <a href="https://interxion.service-now.com/sp?id=sc_cat_item&amp;sys_id=a51573f813663a00279b51a63244b0fb&amp;sysparm_category=bbdec9c9db7f6b00f236cf831596190f" target="_blank" 
                    className="text-primary mb-1 d-block">Software Install request form</a>
                </div>
            </div>
        );
    }
}