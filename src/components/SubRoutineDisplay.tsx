import * as React from "react";
import { Stack } from "react-bootstrap";
import { List } from 'react-movable';
import { LineOfCode } from "./LineOfCode";
import Container from "react-bootstrap/Container";
import {SubRoutine} from "../classes/SubRoutine";
import { CodeBlock } from "../classes/CodeBlock";


//displays a sub routine within a library
export class SubRoutineDisplay extends React.Component<{subRoutine:SubRoutine,refactorLineOfCode:Function,deleteLineOfCode:Function},{subRoutine:SubRoutine}> {

    constructor(props:any) {
        super(props);
       
        this.state =
        {
            subRoutine: this.props.subRoutine
        }
        this.deleteLineOfCode = this.deleteLineOfCode.bind(this);
        this.refactorLineOfCode = this.refactorLineOfCode.bind(this);

    }

    deleteLineOfCode(
       codeBlock:CodeBlock
      ) {
        this.props.deleteLineOfCode(
        codeBlock,
          this.props.subRoutine.name
        )
        this.setState({ subRoutine: this.state.subRoutine }) 
      }

    refactorLineOfCode(codeBlock:CodeBlock){
        this.props.refactorLineOfCode(codeBlock)
    }


    render() {
        return (
            <Stack>
                <h2 className="subRoutineTitle">{this.state.subRoutine.name + '('+ SubRoutine.generateParametersString(this.state.subRoutine.parameters) +'):'}</h2>
                <Container className="px-3">
                    <List   //renders all of the lines of code stored within the subroutine
                            //LIST is a draggable list :)
                        values={this.state.subRoutine.code}
                        onChange={({ oldIndex, newIndex }) => {
                            this.state.subRoutine.updateItemOrder(oldIndex, newIndex)
                            this.setState({
                                subRoutine: this.state.subRoutine
                            })
                        }}
                        renderList={({ children, props }) => <Stack {...props}>{children}</Stack>}
                        renderItem={({ value, props }) => <LineOfCode key={value.key} codeBlock={value} newProps={props} deleteLineOfCode = {this.deleteLineOfCode} refactorLineOfCode={this.refactorLineOfCode}/>}
                    />
                </Container>



            </Stack>
        );
    }
}

