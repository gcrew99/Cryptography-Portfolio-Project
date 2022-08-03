import { typeOfCodeLine, variableAssignmentTypes } from "../constants/variableAssignmentTypes"
import { CodeBlock } from "./CodeBlock"
import { Library } from "./Library"
import { PreviousLibraries } from "./PreviousLibraries"
import { SubRoutine } from "./SubRoutine"


//this class is abstract, meaning it cannot be extansiated, you can just call the functions of it. Via LatexGenerator.xxx
export abstract class LatexGenerator {
 

    private static getPrefix(): string {
        return "\\documentclass[]{article}\n"
            + "\\usepackage[T1]{fontenc}\n"
            + "\\usepackage{setspace}\n"
            + "\\usepackage{xspace}\n"
            + "\\usepackage{graphicx}\n"
            + "\\usepackage{ifxetex,ifluatex}\n"
            + "\\usepackage{amsmath,amssymb}\n"
            + "\\usepackage{xcolor}\n"
    }


    private static getApiGarbage(): string {
        return "\\usepackage{fixltx2e} % provides \\textsubscript\n"
            + "% use microtype if available\n"
            + "\\IfFileExists{microtype.sty}{\\usepackage{microtype}}{}\n"
            + "\\ifnum 0\\ifxetex 1\\fi\\ifluatex 1\\fi=0 % if pdftex\n"
            + "  \\usepackage[utf8]{inputenc}\n"
            + "\\else % if luatex or xelatex\n"
            + "  \\usepackage{fontspec}\n"
            + "  \\ifxetex\n"
            + "    \\usepackage{xltxtra,xunicode}\n"
            + "  \\fi\n"
            + "  \\defaultfontfeatures{Mapping=tex-text,Scale=MatchLowercase}\n"
            + "  \\newcommand{\\euro}{€}\n"
            + "\\fi\n"
            + "\\usepackage[a4paper]{geometry}\n"
            + "\\ifxetex\n"
            + "  \\usepackage[setpagesize=false, % page size defined by xetex\n"
            + "              unicode=false, % unicode breaks when used with xetex\n"
            + "              xetex]{hyperref}\n"
            + "\\else\n"
            + "  \\usepackage[unicode=true]{hyperref}\n"
            + "\\fi\n"
            + "\\hypersetup{breaklinks=true,\n"
            + "            pdfauthor={},\n"
            + "            pdftitle={},\n"
            + "            colorlinks=true,\n"
            + "            urlcolor=blue,\n"
            + "            linkcolor=magenta,\n"
            + "            pdfborder={0 0 0}}\n"
            + "\\setlength{\\parindent}{0pt}\n"
            + "\\setlength{\\parskip}{6pt plus 2pt minus 1pt}\n"
            + "\\setlength{\\emergencystretch}{3em}  % prevent overfull lines\n"
            + "\\setcounter{secnumdepth}{0}\n\n"
    }



    private static postfix: string = "\\end{document}"


    public static generateTitleLatex(title: string): string {
        return `\\title{${title}}\n`
    }
    public static generateAuthorLatex(author: string): string {
        return `\\author{${author}}\n`
    }
    public static generateStartDocumentLatex(): string {
        return `\\begin{document}\n` +
            `\\maketitle\n`
    }

    public static generateDateLatex(): string {
        var today: Date = new Date();
        var dd: string = String(today.getDate()).padStart(2, '0');
        var mm: string = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy: string = String(today.getFullYear());
        var todayString: string = mm + '/' + dd + '/' + yyyy;
        return `\\date{${todayString}}\n`
    }

    public static generateMikeCommandsLatex(): string {
        return '\\newcommand{\\pct}{\\mathbin{\\%}}\n'
            + '% makes ":=" aligned better\n'
            + '\\usepackage{mathtools}\n'
            + '\\mathtoolsset{centercolon}\n'
            + '% indistinguishability operator\n'
            + '% http://tex.stackexchange.com/questions/22168/triple-approx-and-triple-approx-with-a-straight-middle-line\n'

            + "\\newcommand{\\indist}{  \\mathrel{\\vcenter{\\offinterlineskip\n"
            + "  \\hbox{$\\sim$}\\vskip-.35ex\\hbox{$\\sim$}\\vskip-.35ex\\hbox{$\\sim$}}}}\n"
            + "\\renewcommand{\\cong}{\\indist}\n\n\n\n"

            + "\\newcommand{\\K}{\\mathcal{K}}\n"
            + "\\newcommand{\\M}{\\mathcal{M}}\n"
            // + "\\newcommand{\\C}{\\mathcal{C}}\n"
            + "\\newcommand{\\Z}{\\mathbb{Z}}\n\n"

            + "\\newcommand{\\Enc}{\\text{\\sf Enc}}\n"
            + "\\newcommand{\\Dec}{\\text{\\sf Dec}}\n"
            + "\\newcommand{\\KeyGen}{\\text{\\sf KeyGen}}\n\n"
            + "% fancy script L\n"
            + "\\usepackage[mathscr]{euscript}\n"
            + "\\renewcommand{\\L}{\\ensuremath{\\mathscr{L}}\\xspace}\n"
            + "\\newcommand{\\lib}[1]{\\ensuremath{\\L_{\\textsf{#1}}}\\xspace}\n\n\n"

            + "\\newcommand{\\myterm}[1]{\\ensuremath{\\text{#1}}\\xspace}\n"
            + "\\newcommand{\\bias}{\\myterm{bias}}\n"
            + "\\newcommand{\\link}{\\diamond}\n"
            + "\\newcommand{\\subname}[1]{\\ensuremath{\\textsc{#1}}\\xspace}\n\n\n\n"


            + "%% colors\n"
            + "\\definecolor{highlightcolor}{HTML}{F5F5A4}\n"
            + "\\definecolor{highlighttextcolor}{HTML}{000000}\n"
            + "\\definecolor{bitcolor}{HTML}{a91616}\n\n\n"

            + "%%% boxes for writing libraries/constructions\n"
            + "\\usepackage{varwidth}\n\n"
            + "\\newcommand{\\codebox}[1]{%\n"
            + "        \\begin{varwidth}{\\linewidth}%\n"
            + "        \\begin{tabbing}%\n"
            + "            ~~~\\=\\quad\\=\\quad\\=\\quad\\=\\kill % initialize tabstops\n"
            + "            #1\n"
            + "        \\end{tabbing}%\n"
            + "        \\end{varwidth}%\n"
            + "}\n"



            + "\\newcommand{\\titlecodebox}[2]{%\n"
            + "    \\fboxsep=0pt%\n"
            + "    \\fcolorbox{black}{black!10}{%\n"
            + "        \\begin{varwidth}{\\linewidth}%\n"
            + "        \\centering%\n"
            + "        \\fboxsep=3pt%\n"
            + "        \\colorbox{black!10}{#1} \\\\\n"
            + "        \\colorbox{white}{\\codebox{#2}}%\n"
            + "        \\end{varwidth}%\n"
            + "    }\n"
            + "}\n"
            + "\\newcommand{\\fcodebox}[1]{%\n"
            + "    \\framebox{\\codebox{#1}}%\n"
            + "}\n"
            + "\\newcommand{\\hlcodebox}[1]{%\n"
            + "    \\fcolorbox{black}{highlightcolor}{\\codebox{#1}}%\n"
            + "}\n"
            + "\\newcommand{\\hltitlecodebox}[2]{%\n"
            + "    \\fboxsep=0pt%\n"
            + "    \\fcolorbox{black}{black!15!highlightcolor}{%\n"
            + "        \\begin{varwidth}{\\linewidth}%\n"
            + "        \\centering%\n"
            + "        \\fboxsep=3pt%\n"
            + "        \\colorbox{black!15!highlightcolor}{\\color{highlighttextcolor}#1} \\\\\n"
            + "        \\colorbox{highlightcolor}{\\color{highlighttextcolor}\\codebox{#2}}%\n"
            + "        \\end{varwidth}%\n"
            + "    }\n"
            + "}\n"
            + "%% highlighting\n"
            + "\\newcommand{\\basehighlight}[1]{\\colorbox{highlightcolor}{\\color{highlighttextcolor}#1}}\n"
            + "\\newcommand{\\mathhighlight}[1]{\\basehighlight{$#1$}}\n"
            + "\\newcommand{\\highlight}[1]{\\raisebox{0pt}[-\\fboxsep][-\\fboxsep]{\\basehighlight{#1}}}\n"
            + "\\newcommand{\\highlightline}[1]{%\\raisebox{0pt}[-\\fboxsep][-\\fboxsep]{\n"
            + "    \\hspace*{-\\fboxsep}\\basehighlight{#1}%\n"
            + "%}\n"
            + "}\n\n"
            + "%% bits\n"
            + "\\newcommand{\\bit}[1]{\\textcolor{bitcolor}{\\texttt{\\upshape #1}}}\n"
            + "\\newcommand{\\bits}{\\{\\bit0,\\bit1\\}}\n\n\n"

    }



    public static createTestLatex(title: string, author: string, library: Library): string {
        let latex: string = LatexGenerator.getPrefix()
            + LatexGenerator.getApiGarbage()
            + LatexGenerator.generateMikeCommandsLatex()
            + LatexGenerator.generateAuthorLatex(author)
            + LatexGenerator.generateDateLatex()
            + LatexGenerator.generateTitleLatex(title)
            + LatexGenerator.generateStartDocumentLatex()
            + LatexGenerator.generateLibraryLatex(library)
            + LatexGenerator.generateLibraryLatex(library)  
            + LatexGenerator.postfix

        return encodeURIComponent(latex);   //encodeURIComponent is to convert the scary characters to friendly characters

    }

    public static createFullLatexNoURI(title: string, author: string,previousLibraries:PreviousLibraries<[Library,string]>):string{
        let latex: string = LatexGenerator.getPrefix()
        + LatexGenerator.getApiGarbage()
        + LatexGenerator.generateMikeCommandsLatex()
        + LatexGenerator.generateAuthorLatex(author)
        + LatexGenerator.generateDateLatex()
        + LatexGenerator.generateTitleLatex(title)
        + LatexGenerator.generateStartDocumentLatex()
        + LatexGenerator.generateSavedLibrariesLatex(previousLibraries)
        + LatexGenerator.postfix
        return latex;
    }
    public static createFullLatex(title: string, author: string,previousLibraries:PreviousLibraries<[Library,string]>):string{
        let latex: string = LatexGenerator.getPrefix()
        + LatexGenerator.getApiGarbage()
        + LatexGenerator.generateMikeCommandsLatex()
        + LatexGenerator.generateAuthorLatex(author)
        + LatexGenerator.generateDateLatex()
        + LatexGenerator.generateTitleLatex(title)
        + LatexGenerator.generateStartDocumentLatex()
        + LatexGenerator.generateSavedLibrariesLatex(previousLibraries)
        + LatexGenerator.postfix

    return encodeURIComponent(latex);   //encodeURIComponent is to convert the scary characters to friendly characters
    }



    public static generateSavedLibrariesLatex(previousLibraries:PreviousLibraries<[Library,string]>):string{
        var latex:string = "";
        for(var i = 0; i < previousLibraries.size(); i++){
            latex += `\\begin{center}\n${previousLibraries.at(i).at(1) as string}\n\\end{center}\n` //adding the reason for the library change
            latex += this.generateLibraryLatex(previousLibraries.at(i).at(0) as Library);
        }
        return latex
    }

    public static generateLibraryLatex(library: Library): string {
        var latex:string =  `    \\[\n`
        + `            \\titlecodebox{$${library.name}$}{\n`

        var codeBlockLatex:string ="";
        for(const codeBlock of library.codeBlocks){
       
            codeBlockLatex += LatexGenerator.generateCodeBlockLatex(codeBlock)
         
        }
        var subRoutineLatex:string = "";
        for(const subRoutine of library.subRoutines){
            subRoutineLatex += LatexGenerator.generateSubRoutineLatex(subRoutine);
        }




        //the latex that goes at the end of the library
        var postLatex = 
         `            }\n`
        + `    \\]\n`
        + `%\n`


        return latex + codeBlockLatex + subRoutineLatex + postLatex


    }

    //TODO: implement inputs to sub routine
    public static generateSubRoutineLatex(subRoutine: SubRoutine): string {
        var parameters:string = SubRoutine.generateParametersString(subRoutine.parameters);
       
        var subRoutineTitle:string = `\\underline{$\\subname{${subRoutine.name}}(`+parameters+`)$:} \\\\\n`
        var codeBlockLatex:string ="";
        for(const codeBlock of subRoutine.codeBlocks){
            codeBlockLatex += "\\>" + LatexGenerator.generateCodeBlockLatex(codeBlock) + "\n"
        }
        return subRoutineTitle + codeBlockLatex;



    }
    public static generateCodeBlockLatex(codeBlock: CodeBlock): string {
        if(codeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT){
            //if it's a lambda string
            if(codeBlock.variableAssignmentType === variableAssignmentTypes.LAMBDA_LENGTH_STRING){
                return `$${codeBlock.variableName} \\gets \\{0,1\\}^{\\lambda}$\\\\\n`;
            }else if(codeBlock.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE){
                return `$${codeBlock.variableName} := ${codeBlock.variableAssignment}$\\\\\n`;
            }else if(codeBlock.variableAssignmentType === variableAssignmentTypes.VARIABLE){
                return `$${codeBlock.variableName} = ${codeBlock.variableAssignment}$\\\\\n`;
            }else if(codeBlock.variableAssignmentType === variableAssignmentTypes.SUBROUTINE_OUTPUT){
                return `$${codeBlock.variableName} \\gets ${codeBlock.subroutineName}()$\\\\\n`;
            }
        }else if(codeBlock.type === typeOfCodeLine.RETURN_STATEMENT){
            if(codeBlock.variableAssignmentType === variableAssignmentTypes.LAMBDA_LENGTH_STRING){
                return `return $\\{0,1\\}^{\\lambda}$\\\\\n`;
            }else if(codeBlock.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE){
                return `return $ ${codeBlock.variableAssignment}$\\\\\n`;
            }else if(codeBlock.variableAssignmentType === variableAssignmentTypes.VARIABLE){
                return `return $ ${codeBlock.variableAssignment}$\\\\\n`;
            }
        }
        return ""
    }
}