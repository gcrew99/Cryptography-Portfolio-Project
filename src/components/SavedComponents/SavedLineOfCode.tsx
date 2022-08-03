
import * as React from "react";
import { CodeBlock } from "../../classes/CodeBlock";
import { typeOfCodeLine, variableAssignmentTypes } from "../../constants/variableAssignmentTypes";
import "../../css/LineOfCode.css"
//displays a single SAVED line of code, i.e. on the left side
export class SavedLineOfCode extends React.Component<{newProps:any,codeBlock:CodeBlock},{}>{
    

    constructor(props:any){
        super(props);
        this.constructSavedCodeRenderObject = this.constructSavedCodeRenderObject.bind(this);
    }

    //creates the rendered paragraph for the line of code.
    constructSavedCodeRenderObject() {

        let codeParagraph:any;  //any because it becomes a big mess of html
    
        if (this.props.codeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT) { //if the line is a variable assignment line
            if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.LAMBDA_LENGTH_STRING) {
                codeParagraph = <p className="codeText">{this.props.codeBlock.variableName} :=  &#123;0,1&#125;
                    <sup>λ</sup></p>
            } else if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE) {
                codeParagraph = <p className="codeText">{this.props.codeBlock.variableName} := {this.props.codeBlock.variableAssignment}</p>
                   
            } else if(this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.VARIABLE){
                codeParagraph = <p className="codeText">{this.props.codeBlock.variableName} = {this.props.codeBlock.variableAssignment}</p>
            }  else if(this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.SUBROUTINE_OUTPUT){
                codeParagraph = <p className="codeText">{this.props.codeBlock.variableName} = {this.props.codeBlock.subroutineName}(...)</p>
            }
              
        }else if(this.props.codeBlock.type=== typeOfCodeLine.RETURN_STATEMENT){
            if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.LAMBDA_LENGTH_STRING) {
                codeParagraph = <p className="codeText">return &#123;0,1&#125;
                    <sup>λ</sup></p>
            } else if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE) {
                codeParagraph = <p className="codeText">return {this.props.codeBlock.variableAssignment}</p>
                   
            }else if(this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.VARIABLE){
                codeParagraph = <p className="codeText">return {`(${this.props.codeBlock.returnVariables.join(',')})`}</p>
            }  
        }   //this is the only thing we know how to parse for now//this is the only thing we know how to parse for now
        return codeParagraph;
    }
    render() {
        return (<div className="savedCodeLineHolder" key={this.props.codeBlock.key} {...this.props.newProps } >{this.constructSavedCodeRenderObject()}</div>);
    }
   
}


