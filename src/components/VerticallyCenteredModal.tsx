import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap"
import { CodeBlock } from "../classes/CodeBlock";

export class VerticallyCenteredModal extends React.Component<{
    show: boolean,
    onHide: Function,
    refactorCodeBlock: CodeBlock,
    chooseRefactorLocation: Function,
    getPossibleLocations: Function
}, {
    currentLocation: string
}> {


    constructor(props: any) {

        super(props)
        this.state = {
            currentLocation: this.props.getPossibleLocations()[0]
        }
        this.hide = this.hide.bind(this);
        this.createWhereToRefactorOptions = this.createWhereToRefactorOptions.bind(this);
        this.changeWhereRefactoring = this.changeWhereRefactoring.bind(this);
        this.submit = this.submit.bind(this);
    }


    submit(){
        this.props.chooseRefactorLocation(this.props.refactorCodeBlock,this.state.currentLocation);
        this.setState({
            currentLocation:this.props.getPossibleLocations()[0]
        })
        this.hide();
    }
    hide() {
        this.props.onHide(false);
    }
    createWhereToRefactorOptions() {
        var options: any = [];
    
        var possibleLocations:string[] = this.props.getPossibleLocations()
        
        for(var i = 0; i < possibleLocations.length; i++){
            options.push(<option value={possibleLocations[i]}>{possibleLocations[i]}</option>)
        }
        
        return options;
    }
    changeWhereRefactoring(location: string) {
        this.setState({
            currentLocation: location
        })
    }
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.hide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop={true}

            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Refactor Line of Code
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form id="refactorForm" >
                        <Form.Group className="mb-3">
                            <Form.Label>Where would you like to refactor this line of code to?</Form.Label>
                            <Form.Select aria-label="Where to add the line of code"
                                onChange={(e) => {
                                    this.changeWhereRefactoring(e.target.value)
                                }}
                                >
                                {this.createWhereToRefactorOptions()}

                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.submit} variant="success">Refactor</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}