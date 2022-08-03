import * as React from "react";

import { LibraryDisplay } from "./LibraryDisplay";
import { AddAFeature } from "./AddAFeature";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col"
import { typeOfCodeLine } from "../constants/variableAssignmentTypes";
import { CodeBlock } from "../classes/CodeBlock";
import { Library } from "../classes/Library";
import { SubRoutine } from "../classes/SubRoutine";

import { PreviousLibraries } from "../classes/PreviousLibraries";
import { PreviousLibrariesDisplay } from "./SavedComponents/PreviousLibrariesDisplay";
import { Button } from "react-bootstrap";
import { LatexGenerator } from "../classes/LatexGenerator";
import { getHw2_2Library } from "../classes/DefaultLibraries";
import { KeyGenerator } from "../classes/KeyGenerator";

//the main holder for the library which holds all of the different components

export class CodeHolder extends React.Component<{}, { library: Library, previousLibraries: PreviousLibraries<[Library, string]> }> {
    constructor(props: any) {
        super(props);
        this.handleNewVariableSubmitted = this.handleNewVariableSubmitted.bind(this);
        this.handleNewSubRoutineSubmitted = this.handleNewSubRoutineSubmitted.bind(this);

        this.newLibraryNameSet = this.newLibraryNameSet.bind(this)
        this.handleNewReturnStatementSubmitted = this.handleNewReturnStatementSubmitted.bind(this);
        this.handleVariableDeleted = this.handleVariableDeleted.bind(this);
        this.handleNewReturnStatementSubmitted = this.handleNewReturnStatementSubmitted.bind(this);


        this.saveCurrentLibrary = this.saveCurrentLibrary.bind(this);
        this.showLatex = this.showLatex.bind(this);
        this.copyCurrentLatexToClipboard = this.copyCurrentLatexToClipboard.bind(this);

        this.state = {

            library: getHw2_2Library(),
            previousLibraries: new PreviousLibraries<[Library, string]>()
        };
    }

    newLibraryNameSet() {
        this.setState({
            library: this.state.library
        })
    }
    //moves the current library into a list of saved libraries, and displays it on the left side of the screen
    saveCurrentLibrary() {
        var reasonForSaving: string = prompt("Please enter the motivation behind saving this library, i.e. `inlined subroutine into library`", "No Reason Given");
        //push a tuple with reasonForSaving added so it can be displayed in latex.
        this.state.previousLibraries.push([JSON.parse(JSON.stringify(this.state.library)), reasonForSaving]);
        this.state.library.versionNumber = this.state.library.versionNumber + 1
        this.setState({

            previousLibraries: this.state.previousLibraries,
            library: this.state.library

        })
    }

    //Shows the latex code in a PDF format, note: not finished.
    showLatex() {

        let latex: string = LatexGenerator.createFullLatex("Test Title", "Test Author", this.state.previousLibraries)
        window.open("https://latexonline.cc/compile?text=" + latex);
        //this.sendLatexToServer(latex)
    }

    //function that is called whenever a variable is deleted from a Library
    handleVariableDeleted(
        codeBlock: CodeBlock,
        destination: string
    ) {


        var libraryFound = false;
        if (this.state.library.name === destination) {
            libraryFound = true;
            this.state.library.deleteCodeBlock(codeBlock);


        }
        var subRoutineFound = false;
        for (const subRoutine of this.state.library.subRoutines) {   //looking for the library we will be submitting to
            if (subRoutine.name === destination) {
                subRoutineFound = true;
                subRoutine.deleteCodeBlock(codeBlock);

                break;
            }
        }

        this.setState({ library: this.state.library })
        return true;
    }

    //function that is called whenever a new variable is submitted to a LIBRARY
    handleNewVariableSubmitted(

        newVariableName: string,
        newVariableAssignmentType: number,
        newVariableAssignment: string,
        destination: string,
        subroutineName: string
    ) {
        let c = new CodeBlock(
            typeOfCodeLine.VARIABLE_ASSIGNMENT,
            newVariableName,
            newVariableAssignmentType,
            newVariableAssignment,
            KeyGenerator.generateKey(20),
            [], subroutineName
        );
        console.log(subroutineName)
        var libraryFound = false;

        if (this.state.library.name === destination) {
            libraryFound = true;
            this.state.library.addNewCodeBlock(c);


        }


        var subRoutineFound = false;
        for (const subRoutine of this.state.library.subRoutines) {   //looking for the library we will be submitting to
            if (subRoutine.name === destination) {
                subRoutineFound = true;
                subRoutine.addNewCodeBlock(c);

                break;
            }
        }
        if (!libraryFound && !subRoutineFound) {
            alert("Could not find the library or subroutine for this variable");
            return false;

        } else {
            this.setState({ library: this.state.library })
            return true;
        }
    }

    handleNewSubRoutineSubmitted(
        libraryName: string,
        subRoutineName: string,
        subRoutineParameters: string[]
    ) {

        let s: SubRoutine = new SubRoutine(libraryName, subRoutineName, [], subRoutineParameters);
        var libraryFound = false;

        if (this.state.library.name === libraryName) {
            libraryFound = true;
            this.state.library.addSubRoutine(s);
            this.setState({
                library: this.state.library
            })

        }

        if (libraryFound === false) {
            alert(`Did not find a library with name ${libraryName}`);
            return false;
        } else {
            return true;
        }
    }
    handleNewReturnStatementSubmitted(returnAssignment: string, destination: string, assignmentType: number, variables: string[]) {
        let c = new CodeBlock(
            typeOfCodeLine.RETURN_STATEMENT,
            "",
            assignmentType,
            returnAssignment,
            KeyGenerator.generateKey(20),
            variables
        );




        var subRoutineFound = false;
        for (const subRoutine of this.state.library.subRoutines) {   //looking for the library we will be submitting to
            if (subRoutine.name === destination) {
                subRoutineFound = true;
                subRoutine.addNewCodeBlock(c);

                break;
            }
        }
        if (!subRoutineFound) {
            alert("Could not find the subroutine for this variable");
            return false;

        } else {
            this.setState({ library: this.state.library })
            return true;
        }
    }

    copyCurrentLatexToClipboard() {
        navigator.clipboard.writeText(LatexGenerator.createFullLatexNoURI("Test Title", "Test Author", this.state.previousLibraries));
        alert("Previous Libraries Latex has been copied to clipboard. Paste it into a .tex file to see the result.")
    }

    //render function
    render() {
        return (
            <Container className="justify-content-between align-items-start">
                <Stack direction="horizontal" className="align-items-start">
                    <Col sm={4}>
                        <PreviousLibrariesDisplay previousLibraries={this.state.previousLibraries} />
                    </Col>
                    <Col sm={8} className="align-self-start" >
                        <h1>Current Library</h1>
                        <LibraryDisplay library={this.state.library} notifyNewLibraryName={this.newLibraryNameSet} deleteVariable={this.handleVariableDeleted} libraryName={this.state.library.name} />
                        <AddAFeature submitReturnStatement={this.handleNewReturnStatementSubmitted} currentSubRoutineNames={this.state.library.subRoutineNames} currentSubRoutines={this.state.library.subRoutines} libraryName={this.state.library.name} submitVariable={this.handleNewVariableSubmitted} submitSubRoutine={this.handleNewSubRoutineSubmitted} />
                    </Col>
                </Stack>
                <Button id="fabButton" variant="success" type="button" onClick={this.saveCurrentLibrary}>
                    Save Current Library
                </Button>

                <Button variant="success" id="fabButtonTwo" type="button" onClick={this.showLatex}>
                    Show Previous Libraries Latex
                </Button>
                <Button id="fabButtonThree" variant="success" type="button" onClick={this.copyCurrentLatexToClipboard}>
                    Copy Previous Libraries Latex <i className="fa fa-files-o" aria-hidden="true" />
                </Button>

            </Container>
        );
    }
}
