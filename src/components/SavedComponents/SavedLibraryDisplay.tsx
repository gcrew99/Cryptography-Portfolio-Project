import * as React from "react";
import { Container, Stack } from "react-bootstrap";

import { Library } from "../../classes/Library";


import { SavedSubRoutineDisplay } from "./SavedSubRoutineDisplay";
import { SavedLineOfCode } from "./SavedLineOfCode";
import { KeyGenerator } from "../../classes/KeyGenerator";
//displays a saved library
export class SavedLibraryDisplay extends React.Component<{ library: Library }, { library: Library }>{

    constructor(props: any) {
        super(props);
    
        this.state =
        {
            library: this.props.library,

        }

    }


    render() {
        return (
            <Stack>
                <h4 className="savedLibraryTitle">{this.state.library.name}</h4>
                <Container className="p-1 border border-dark">
                    <Stack>
                        {this.state.library.codeBlocks.map((codeBlock) => ( //renders every code block in the library that is not in a subroutine
                            <SavedLineOfCode key={codeBlock.key} codeBlock={codeBlock} newProps={[]}/>
                        ))}
                    </Stack>

                    {this.state.library.subRoutines.map((subRoutine) => //renders every subroutine in the library
                       

                            <SavedSubRoutineDisplay key={KeyGenerator.generateKey(20)} subRoutine={subRoutine} />
                        
                    )}
                </Container>



            </Stack>
        );
    }
}


