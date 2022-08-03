

//all of the things that a variable could be assigned to.
//LAMBDA_LENGTH_STRING means assigning a variable to {0,1}^lambda
//USER_INPUTED_VALUE means a value inputted by the user 'asdfdsa', 12321, 0^lambda, or something else
export enum variableAssignmentTypes
{
    LAMBDA_LENGTH_STRING=0,
    USER_INPUTED_VALUE,
    SUBROUTINE_OUTPUT,
    VARIABLE,
    POSSIBLE_VARIABLE_TYPES

}


//the different types of code lines.
//Currently there is only one type of line of code, which is VARIABLE_ASSIGNMENT, assigning a variable to a value.
export enum typeOfCodeLine{
    VARIABLE_ASSIGNMENT=0,
    RETURN_STATEMENT,
    POSSIBLE_CODE_LINE_TYPES
}
