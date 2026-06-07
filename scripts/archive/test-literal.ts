import { Project, SyntaxKind, StringLiteral } from 'ts-morph';

const project = new Project();
project.addSourceFilesAtPaths('src/courses/Course_Premiere_03_Second_Degre.tsx');
const sourceFile = project.getSourceFiles()[0];

const jsxExprs = sourceFile.getDescendantsOfKind(SyntaxKind.JsxExpression);
jsxExprs.forEach(expr => {
    const inner = expr.getExpression();
    if (inner && inner.isKind(SyntaxKind.StringLiteral)) {
        if (inner.getText().includes('Delta')) {
            console.log("getText():", inner.getText());
            console.log("getLiteralValue():", inner.getLiteralValue());
        }
    }
});
