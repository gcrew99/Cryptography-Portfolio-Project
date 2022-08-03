import { typeOfCodeLine, variableAssignmentTypes } from "../constants/variableAssignmentTypes";
import { CodeBlock } from "./CodeBlock";
import { KeyGenerator } from "./KeyGenerator";
import { Library } from "./Library";
import { SubRoutine } from "./SubRoutine";




export function getHw2_2Library(): Library {
    var hw2_2Library: Library = new Library(
        "LibL", 1,
        []
    );

 
    var EAV: SubRoutine = new SubRoutine("Sigma^2", "EAV", [], ["ml","mr"])
   EAV.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "k1", variableAssignmentTypes.USER_INPUTED_VALUE, "S.KeyGen()", KeyGenerator.generateKey(20)))
   EAV.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "k2", variableAssignmentTypes.USER_INPUTED_VALUE, "S.KeyGen()", KeyGenerator.generateKey(20)))
   EAV.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "c1", variableAssignmentTypes.USER_INPUTED_VALUE, "S.Enc(k1,ml)", KeyGenerator.generateKey(20)))
   EAV.addNewCodeBlock(new CodeBlock(typeOfCodeLine.VARIABLE_ASSIGNMENT, "c2", variableAssignmentTypes.USER_INPUTED_VALUE, "S.Enc(k2,ml)", KeyGenerator.generateKey(20)))
   EAV.addNewCodeBlock(new CodeBlock(typeOfCodeLine.RETURN_STATEMENT, "", variableAssignmentTypes.VARIABLE, "", KeyGenerator.generateKey(20),["c1","c2  "]))
    hw2_2Library.addSubRoutine(EAV);

  

    return hw2_2Library;
}