import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { variableAssignmentTypes } from "../constants/variableAssignmentTypes";

import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import { SubRoutine } from "../classes/SubRoutine";


//component that allows user to input a new thing and add it to a library
export class AddAFeature extends React.Component<{
  currentSubRoutineNames: Map<string, number>,
  currentSubRoutines: SubRoutine[],
  libraryName: string,
  submitVariable: Function,
  submitSubRoutine: Function,
  submitReturnStatement: Function
},
  {
    subRoutineName: string,
    subRoutineVariableNames: Map<number, string>,
    amountOfParameters: number, variableName: string,
    variableAssignment: string,
    variableAssignmentType: number,
    addSubRoutineDestination: string,


    returnAssignment: string,
    returnAssignmentType: number,
    returnAssignmentDestination: string,
    returnVariableAmount: number,
    returnVariables: string[],


    addSubRoutineSelected: boolean,
    addReturnStatementSelected: boolean,
    addVariableSelected: boolean,
    addVariableDestination: string
  }> {

  //constructor
  constructor(props: any) {
    super(props);
    this.state = {
      addSubRoutineDestination : "",
      variableName: "",
      subRoutineName: "",
      addVariableSelected: true,
      addSubRoutineSelected: false,
      addReturnStatementSelected: false,


      addVariableDestination: this.props.libraryName,
      variableAssignment: "",
      variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING,

      returnAssignmentDestination: this.props.currentSubRoutines[0] ? this.props.currentSubRoutines[0].name : "",
      returnAssignment: "",

      returnAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING,

      amountOfParameters: 0,
      returnVariableAmount: 0,
      returnVariables: [],
      subRoutineVariableNames: new Map<number, string>()
    };

    this.handleVariableNameChange = this.handleVariableNameChange.bind(this);
    this.submitVariable = this.submitVariable.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.lambdaStringChosen = this.lambdaStringChosen.bind(this);
    this.userEnteredVariableChosen = this.userEnteredVariableChosen.bind(this);
    this.userEnteredSubroutineOutput = this.userEnteredSubroutineOutput.bind(this);
    this.handleVariableValueChange = this.handleVariableValueChange.bind(this);
    this.createAddVariableForm = this.createAddVariableForm.bind(this);
    this.createAddSubRoutineForm = this.createAddSubRoutineForm.bind(this);
    this.selectAddVariable = this.selectAddVariable.bind(this);
    this.selectAddSubRoutine = this.selectAddSubRoutine.bind(this);
    this.handleSubRoutineNameChange = this.handleSubRoutineNameChange.bind(this)
    this.submitSubRoutine = this.submitSubRoutine.bind(this);
    this.updateParameterAmount = this.updateParameterAmount.bind(this);
    this.createReturnVariablesForm = this.createReturnVariablesForm.bind(this);

    this.displayParameterInputs = this.displayParameterInputs.bind(this);
    this.handleParameterNameChange = this.handleParameterNameChange.bind(this);
    this.changeWhereAddingVariable = this.changeWhereAddingVariable.bind(this);
    this.createWhereToAddSubroutine = this.createWhereToAddSubroutine.bind(this);
    this.userEnteredSubroutineOutput = this.userEnteredSubroutineOutput.bind(this);


    /*Return statement functions */
    this.createWhereToAddReturnStatementOptions = this.createWhereToAddReturnStatementOptions.bind(this);
    this.changeWhereAddingReturnStatement = this.changeWhereAddingReturnStatement.bind(this);
    this.createAddReturnStatementForm = this.createAddReturnStatementForm.bind(this);
    this.lambdaStringReturnTypeChosen = this.lambdaStringReturnTypeChosen.bind(this);
    this.userEnteredReturnTypeChosen = this.userEnteredReturnTypeChosen.bind(this);
    this.variableReturnTypeChosen = this.variableReturnTypeChosen.bind(this);
    this.submitReturnStatement = this.submitReturnStatement.bind(this);
    this.createVariablesForReturnStatementOptions = this.createVariablesForReturnStatementOptions.bind(this);
    this.changeVariableSelectedForReturnStatement = this.changeVariableSelectedForReturnStatement.bind(this);
    this.updateVariableAmountReturning = this.updateVariableAmountReturning.bind(this);
    this.getWhatShouldReturnVariableBe = this.getWhatShouldReturnVariableBe.bind(this);
    /*end*/

  }


  //handles keydowns for the form
  handleKeyDown(e: any, callback: Function) {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      callback();
    }
  }


  //handles when the variable NAMe is changed, i.e A = 123, A is the variable name
  handleVariableNameChange(event: any) {

    this.setState({ variableName: event.target.value });
  }


  //called whenever a subroutine name changes
  handleSubRoutineNameChange(event: any) {
    this.setState({ subRoutineName: event.target.value })
  }


  //called whenever the name to a parameter changes
  handleParameterNameChange(event: any) {

    this.state.subRoutineVariableNames.set(Number(event.target.id), event.target.value)
    this.setState({
      subRoutineVariableNames: this.state.subRoutineVariableNames
    })


  }

  //event handler for when variable VALUE is changed, i.e. A=123, 123 is the variable value
  handleVariableValueChange(event: any) {
    this.setState({ variableAssignment: event.target.value })
  }

  //event handler for when user presses submit variable, calls parent submit variable function
  submitVariable() {

    if (this.props.submitVariable( //submit variable returns false if it couldn't submit
      this.state.variableName,
      this.state.variableAssignmentType,
      this.state.variableAssignment,
      this.state.addVariableDestination,
      this.state.addSubRoutineDestination
    ) === true) {
      (document.getElementById("variableForm") as HTMLFormElement).reset();   //clears the form
      this.setState({
        variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING
      })
    }


  }

  submitSubRoutine() {
    if (this.state.subRoutineName.length === 0) {
      alert("Your subroutine must have a name!");
      return;
    }
    var subRoutineNames: string[] = []
    for (let i: number = 0; i < this.state.amountOfParameters; i++) {
      for (let j: number = i + 1; j < this.state.amountOfParameters; j++) {

        if (this.state.subRoutineVariableNames.get(i) === this.state.subRoutineVariableNames.get(j)) {
          alert("You cannot have two parameter names that are identical.");
          return;
        }
      }
      if (this.state.subRoutineVariableNames.has(i) === false || this.state.subRoutineVariableNames.get(i).length === 0) {
        alert("You must name every parameter to your subroutine!");
        return;
      }
      subRoutineNames.push(this.state.subRoutineVariableNames.get(i))
    }
    if (this.props.submitSubRoutine( //submit subroutine returns false if it couldn't submit
      this.props.libraryName,
      this.state.subRoutineName,
      subRoutineNames
    ) === true) {

      (document.getElementById("subRoutineForm") as HTMLFormElement).reset();   //clears the form
      this.setState({
        amountOfParameters: 0
      })
    }


  }

  //triggered when the user pressed the {0,1}^lambda button, updates the type of variable the user is assigning
  lambdaStringChosen() {

    this.setState({
      variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING
    });

  }


  selectAddVariable() {
    this.setState({
      addVariableSelected: true,
      addReturnStatementSelected: false,
      addSubRoutineSelected: false,
      addSubRoutineDestination: this.props.currentSubRoutines[0].name
    })
  }

  selectAddSubRoutine() {
    this.setState({
      addVariableSelected: false,
      addReturnStatementSelected: false,
      addSubRoutineSelected: true
    })
  }
  selectAddReturnStatement() {
    this.setState({
      addVariableSelected: false,
      addSubRoutineSelected: false,
      addReturnStatementSelected: true,
      returnVariableAmount: 1,
      returnVariables: []
    })
  }

  //updates the amount of parameters when the user is attempting to submit a subroutine
  updateParameterAmount(amount: number) {
    this.setState({
      amountOfParameters: amount
    })
  }
  updateVariableAmountReturning(amount: string) {
    console.log("Updating the variable amount returning");
    if (this.state.returnVariables.length > 0) {
      this.state.returnVariables.pop()
    }
    while (this.state.returnVariables.length !== Number(amount)) {
      this.state.returnVariables.push("null")
    }
    this.setState({
      returnVariableAmount: Number(amount),
      returnVariables: this.state.returnVariables

    })
  }
  //returns a list of the input boxes where user can enter parameter names
  displayParameterInputs() {
    var allParameters: any = [];
    for (let i = 0; i < this.state.amountOfParameters; i++) {

      allParameters.push(<Form.Group className="mb-3" controlId="formParameterInput" key={i.toString()}>
        <Form.Label>Parameter #{i}</Form.Label>
        <Form.Control type="text" placeholder="Enter unique parameter name" id={i.toString()} onChange={this.handleParameterNameChange} />

      </Form.Group>);
    }

    return allParameters;


  }

  userEnteredSubroutineOutput() {

    this.setState({
      variableAssignmentType: variableAssignmentTypes.SUBROUTINE_OUTPUT
    })
  }

  //triggered when user chooses to enter their own variable value.
  userEnteredVariableChosen() {

    this.setState({
      variableAssignmentType: variableAssignmentTypes.USER_INPUTED_VALUE
    })
  }
  changeWhereAddingVariable(target: string) {

    this.setState({
      addVariableDestination: target
    })
  }

  changeWhereAddingSubroutineOutput(target: string) {

    this.setState({
      addSubRoutineDestination: target
    })
  }

  changeWhereNameSubroutineOutput(target: string){
   
    this.setState({
      addSubRoutineDestination: target
    })
  }

  changeWhereAddingReturnStatement(target: string) {
    this.setState({
      returnAssignmentDestination: target
    })
  }

  createWhereToAddSubroutine()  {
    var options: any = [];
    var destinationNameFound: boolean = false; // whether we have found where the destination is supposed to go
    if (this.state.addVariableDestination === this.props.libraryName) {
      destinationNameFound = true;
    }

    for (let subRoutineName of Array.from(this.props.currentSubRoutineNames.keys())) {
      options.push(<option value={subRoutineName}>SubRoutine {subRoutineName}</option>)
      if (subRoutineName === this.state.addVariableDestination) {
        destinationNameFound = true;
      }
    }
    if (!destinationNameFound) {
      this.setState({
        addVariableDestination: this.props.libraryName
      })
    }
    return options;
  }

  //creates a list of the optinos for where a variable can be added
  createWhereToAddOptions() {

    var options: any = [];
    var destinationNameFound: boolean = false; // whether we have found where the destination is supposed to go
    options.push(<option value={this.props.libraryName}>{this.props.libraryName}</option>)
    if (this.state.addVariableDestination === this.props.libraryName) {
      destinationNameFound = true;
    }

    for (let subRoutineName of Array.from(this.props.currentSubRoutineNames.keys())) {
      options.push(<option value={subRoutineName}>SubRoutine {subRoutineName}</option>)
      if (subRoutineName === this.state.addVariableDestination) {
        destinationNameFound = true;
      }
    }
    if (!destinationNameFound) {
      this.setState({
        addVariableDestination: this.props.libraryName
      })
    }
    return options;
  }
  createWhereToAddReturnStatementOptions() {
    var options: any = [];
    for (let subRoutineName of Array.from(this.props.currentSubRoutineNames.keys())) {
      options.push(<option value={subRoutineName}>{subRoutineName}</option>)

    }
    if (this.state.returnAssignmentDestination === "") {
      this.setState({
        returnAssignmentDestination: this.props.currentSubRoutines[0] ? this.props.currentSubRoutines[0].name : ""
      })
    }


    return options;
  }

  createAddVariableForm() {
    return <Form
      id="variableForm"
      onKeyDown={(e) => {
        this.handleKeyDown(e, this.submitVariable);
      }}
    >

      <Form.Group className="mb-3">
        <Form.Label>Add a variable</Form.Label>
        <Form.Control
          type="text"
          placeholder="Variable Name"
          onChange={this.handleVariableNameChange}
        />
        <Form.Text className="text-muted">
          This must be a unique variable name.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Where to add this variable</Form.Label>
        <Form.Select aria-label="Where to add the variable"
          onChange={(e) => {
            this.changeWhereAddingVariable(e.target.value)
          }



          }>
          {this.createWhereToAddOptions()}

        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton
            id="tbg-radio-1"
            value={1}
            onClick={this.lambdaStringChosen}
          >
            &#123;0,1&#125;
            <sup>λ</sup>
          </ToggleButton>
          <ToggleButton
            id="tbg-radio-2"
            value={2}
            onClick={this.userEnteredVariableChosen}
          >
            Input Value:
          </ToggleButton>

          <ToggleButton
            id="tbg-radio-3"
            value={3}
            onClick={this.userEnteredSubroutineOutput}
          >
            Subroutine Output:
          </ToggleButton>

        </ToggleButtonGroup>

        <Form.Group className="mb-4" hidden={this.state.variableAssignmentType === variableAssignmentTypes.SUBROUTINE_OUTPUT ? false : true}>
        <Form.Label>What subroutine output should this variable be assigned to?</Form.Label>
        <Form.Select aria-label="What subroutine output should this variable be assigned to"
          onChange={(e) => {
            this.changeWhereNameSubroutineOutput(e.target.value)
          }



          }>
          {this.createWhereToAddSubroutine()}

        </Form.Select>
      </Form.Group>

        <Form.Control //we only show this control if the user assignment type is USER_INPUTTED_VALUE
          type="text"
          placeholder="Variable Value"
          onChange={this.handleVariableValueChange}
          hidden={this.state.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE ? false : true}
        />
        <Form.Text className="text-muted"
          hidden={this.state.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE ? false : true}>
          Assign a value to this variable.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="button" onClick={this.submitVariable}>
        Add Variable
      </Button>
    </Form>
  }
  createAddSubRoutineForm() {
    return <Form
      id="subRoutineForm"
      onKeyDown={(e) => {
        this.handleKeyDown(e, this.submitSubRoutine);
      }}
    >

      <Form.Group className="mb-3">
        <Form.Label>Add a subroutine</Form.Label>
        <Form.Control
          type="text"
          placeholder="Subroutine Name"
          onChange={this.handleSubRoutineNameChange}
        />
        <Form.Text className="text-muted">
          This must be a unique subroutine name
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Amount of Parameters</Form.Label>
        <Form.Select aria-label="Default select example"
          onChange={(e) => {
            this.updateParameterAmount(Number(e.target.value))
          }


          }>

          <option value="0">No Parameters</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
        </Form.Select>
      </Form.Group>
      {this.displayParameterInputs()}

      <Button variant="primary" type="button" onClick={this.submitSubRoutine}>
        Add SubRoutine
      </Button>
    </Form>
  }

  lambdaStringReturnTypeChosen() {

    this.setState({
      returnAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING
    })
  }
  variableReturnTypeChosen() {
    this.setState({
      returnAssignmentType: variableAssignmentTypes.VARIABLE,
      returnVariableAmount: 0,
      returnVariables: []
    })

  }
  userEnteredReturnTypeChosen() {
    this.setState({
      returnAssignmentType: variableAssignmentTypes.USER_INPUTED_VALUE
    })
  }

  createVariablesForReturnStatementOptions() {
    var options: any = [];
    var selectedSub: SubRoutine;


    for (let subRoutine of this.props.currentSubRoutines) {


      if (subRoutine.name === this.state.returnAssignmentDestination) {
        selectedSub = subRoutine;
        break;
      }
    }
    if (selectedSub === undefined) {

      return [];
    }

    for (let variable of Array.from(selectedSub.variables.keys())) {
      options.push(<option value={variable}>Variable {variable}</option>)

    }
    return options;
  }





  submitReturnStatement() {
    console.log(this.state.returnVariables.toString())
    if (this.props.submitReturnStatement( //submit variable returns false if it couldn't submit
      this.state.returnAssignment,
      this.state.returnAssignmentDestination,
      this.state.returnAssignmentType,
      this.state.returnVariables


    ) === true) {
      (document.getElementById("variableForm") as HTMLFormElement).reset();   //clears the form
      this.setState({
        returnAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING
      })
    }
  }

  changeVariableSelectedForReturnStatement(index: number, value: string) {
    console.log(`Updating index: ${index} with value: ${value}`)
    this.state.returnVariables[index] = value;
    this.setState({
      returnVariables: this.state.returnVariables
    })
  }

  getWhatShouldReturnVariableBe(): any[] {
    var options: any[] = [];

    for (let i = 0; i < this.state.returnVariableAmount; i++) {
      options.push(
        <Form.Group className="mb-3" hidden={this.state.returnAssignmentType === variableAssignmentTypes.VARIABLE ? false : true}>
          <Form.Label >What should return variable {i} be?</Form.Label>
          <Form.Select aria-label={`What variable to assign return value ${i} to`}

            onChange={(e) => {
              this.changeVariableSelectedForReturnStatement(i, e.target.value)
            }}
          >
            {this.createVariablesForReturnStatementOptions()}

          </Form.Select>

        </Form.Group>)
    }
    return options;

  }

  createReturnVariablesForm() {

    var options = this.getWhatShouldReturnVariableBe();
    return [
      <Form.Group className="mb-3" hidden={this.state.returnAssignmentType === variableAssignmentTypes.VARIABLE ? false : true}>
        <Form.Label>How many variables do you want to return?</Form.Label>
        <Form.Select aria-label="Default select example"
          onChange={(e) => {
            this.updateVariableAmountReturning(e.target.value)
          }


          }>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
          <option value={4}>Four</option>
          <option value={5}>Five</option>
        </Form.Select>
      </Form.Group>,
      ...options


    ]
  }

  createAddReturnStatementForm() {
    return <Form
      id="variableForm"
      onKeyDown={(e) => {
        this.handleKeyDown(e, this.submitVariable);
      }}
    >


      <Form.Group className="mb-3">
        <Form.Label>Which subroutine will this return statement go in?</Form.Label>
        <Form.Select aria-label="Where to add the return statement"
          onChange={(e) => {
            this.changeWhereAddingReturnStatement(e.target.value)
          }



          }>
          {this.createWhereToAddReturnStatementOptions()}

        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>What should this subroutine return?  </Form.Label>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton
            id="tbg-radio-1"
            value={1}
            onClick={this.lambdaStringReturnTypeChosen}
          >
            &#123;0,1&#125;
            <sup>λ</sup>
          </ToggleButton>
          <ToggleButton
            id="tbg-radio-2"
            value={2}
            onClick={this.variableReturnTypeChosen}
          >
            SubRoutine Variables
          </ToggleButton>
          <ToggleButton
            id="tbg-radio-3"
            value={3}
            onClick={this.userEnteredReturnTypeChosen}
          >
            Input Value:
          </ToggleButton>

        </ToggleButtonGroup>
      </Form.Group>

      {this.createReturnVariablesForm()}



      <Button variant="primary" type="button" onClick={this.submitReturnStatement}>
        Add Return Statement
      </Button>
    </Form >
  }




  createDropDownSelector() {
    return (
      <DropdownButton className="mt-2" id="dropdown-basic-button" variant="info" title="Edit Selection Type">
        <Dropdown.Item onClick={
          (e) => {
            this.selectAddVariable()
          }




        }>Add Variable</Dropdown.Item>
        <Dropdown.Item onClick={
          (e) => {
            this.selectAddSubRoutine()
          }




        }>Add SubRoutine</Dropdown.Item>
        {Array.from(this.props.currentSubRoutineNames.keys()).length == 0 ? null : (<Dropdown.Item onClick={ //only display this option if there is currently a subroutine
          (_e) => {
            this.selectAddReturnStatement()
          }




        }>Add Return Statement</Dropdown.Item>)}

      </DropdownButton>
    )
  }


  render() {
    return (
      <Stack>
        {this.createDropDownSelector()}
        {this.state.addVariableSelected ? this.createAddVariableForm() : null}
        {this.state.addSubRoutineSelected ? this.createAddSubRoutineForm() : null}
        {this.state.addReturnStatementSelected ? this.createAddReturnStatementForm() : null}
      </Stack>
    )

  }
}


