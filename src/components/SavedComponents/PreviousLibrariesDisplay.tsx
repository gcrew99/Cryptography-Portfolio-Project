import * as React from "react";
import { Button, Container, Stack} from "react-bootstrap";
import { KeyGenerator } from "../../classes/KeyGenerator";
import { Library } from "../../classes/Library";
import { PreviousLibraries } from "../../classes/PreviousLibraries";

import { SavedLibraryDisplay } from "./SavedLibraryDisplay";



export class PreviousLibrariesDisplay extends React.Component<{previousLibraries:PreviousLibraries<[Library,string]>},{previousLibraries:PreviousLibraries<[Library,string]>}> {


    constructor(props:any){
        super(props);
        this.state={
            previousLibraries:this.props.previousLibraries,
           
        }
        this.deleteSavedLibraryAt = this.deleteSavedLibraryAt.bind(this);
        this.createLibrariesRenderObject = this.createLibrariesRenderObject.bind(this);
    }


    //deletes a saved library
    deleteSavedLibraryAt(index:number){
        this.state.previousLibraries.remove(index);
        this.setState({
            previousLibraries:this.state.previousLibraries
        })
    }

    //creates the list of libraries to display
    createLibrariesRenderObject():any{
        
        var smallLibraryDisplays:any = []
        for(let i = this.state.previousLibraries.size()-1; i >=0; i--){
            smallLibraryDisplays.push(
                <Stack key={KeyGenerator.generateKey(20)}>
                   
                    <SavedLibraryDisplay
                    library={this.state.previousLibraries.at(i).at(0) as Library}/>
                     <p className="reasonForSavingLibrary">{this.state.previousLibraries.at(i).at(1) as string}</p>
                    <Button className="px-0 mx-0" variant="danger" onClick = {()=>this.deleteSavedLibraryAt(i)}>Delete saved library</Button>
                </Stack>
               
                
            )
        }
        return smallLibraryDisplays;

    }

    render(): React.ReactNode {
        return(
           <Container>
               <h1>Previous Libraries</h1>
               <h2>Most Recent First</h2>
               {this.createLibrariesRenderObject()}
           </Container>
        )
    }
}