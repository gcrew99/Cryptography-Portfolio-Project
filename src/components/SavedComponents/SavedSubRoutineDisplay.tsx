import * as React from "react";
import { Stack } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import { SubRoutine } from "../../classes/SubRoutine";

import { SavedLineOfCode } from "./SavedLineOfCode";


//displays a SAVED sub routine, i.e. on the left side of the screen.
export class SavedSubRoutineDisplay extends React.Component<{ subRoutine: SubRoutine }, { subRoutine: SubRoutine }> {

    //constructor
    constructor(props: any) {
        super(props);

        this.state =
        {
            subRoutine: this.props.subRoutine
        }

    }

   

    render() {
        return (
            <Stack>
                <h4 className="savedSubRoutineTitle">{this.state.subRoutine.name + '(' + SubRoutine.generateParametersString(this.state.subRoutine.parameters) + '):'}</h4>
                <Container className="px-3">
                    <Stack>
                        {this.state.subRoutine.codeBlocks.map((codeBlock) => (    //display all of the code blocks within the subroutine
                            <SavedLineOfCode key={codeBlock.key} codeBlock={codeBlock} newProps={[]} />
                        ))}

                    </Stack>

                </Container>



            </Stack>
        );
    }
}

