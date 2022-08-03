export class CodeBlock{
    type: number;
    variableName: string;
    variableAssignmentType:number;
    variableAssignment:string;
    key:string;
    returnVariables:string[];
    subroutineName:string;
    constructor(
        type:number,variableName:string,variableAssignmentType:number,variableAssignment:string,key:string,returnVariables:string[] = [], subroutineName : string  = ""
    ){
        this.type = type;
        this.variableName = variableName;
        this.variableAssignmentType = variableAssignmentType;
        this.variableAssignment = variableAssignment;
        this.key = key;
        this.returnVariables = returnVariables;
        this.subroutineName = subroutineName;
    }

   
}

