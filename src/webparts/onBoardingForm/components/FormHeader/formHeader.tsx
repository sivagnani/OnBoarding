import * as React from "react";
import "./formHeader.css";
import { IFormHeaderProps, IFormHeaderState } from './IFormHeader'
export default class FormHeader extends React.Component<IFormHeaderProps, IFormHeaderState>{
    render(): React.ReactNode {
        return (
            <div>
                <h2 className='formHeader'>OnBoard Access Request</h2>
                <hr />
            </div>
        );
    }
}