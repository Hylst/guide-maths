import { Project, SyntaxKind } from 'ts-morph';

const project = new Project();
project.addSourceFilesAtPaths('src/courses/Course_Premiere_03_Second_Degre.tsx');
const sourceFile = project.getSourceFiles()[0];

const jsxExprs = sourceFile.getDescendantsOfKind(SyntaxKind.JsxExpression);
jsxExprs.forEach(expr => {
    const inner = expr.getExpression();
    if (inner && inner.isKind(SyntaxKind.StringLiteral)) {
        const textValue = inner.getLiteralValue();
        const regex = /(?<!\\)\$((?:[^$]|\\\$)+?)(?<!\\)\$/g;
        if (regex.test(textValue)) {
            const parts = textValue.split(regex);
            let newJsx = '';
            for (let i = 0; i < parts.length; i++) {
                if (i % 2 === 1) { 
                    newJsx += `<MathComponent math={${JSON.stringify(parts[i])}} />`;
                } else { 
                    newJsx += parts[i];
                }
            }
            console.log("Original expression:", expr.getText());
            console.log("Transformed:", `<>${newJsx}</>`);
            console.log("---------------");
        }
    }
});
