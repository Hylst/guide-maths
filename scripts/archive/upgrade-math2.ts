import { Project, SyntaxKind } from 'ts-morph';
import path from 'path';

const project = new Project();
project.addSourceFilesAtPaths('src/courses/**/*.tsx');

let totalReplaced = 0;

project.getSourceFiles().forEach(sourceFile => {
    let modified = false;

    // We can define a function to get a fresh regex
    const getRegex = () => /(?<!\\)\$((?:[^$]|\\\$)+?)(?<!\\)\$/g;

    const jsxTexts = sourceFile.getDescendantsOfKind(SyntaxKind.JsxText);
    jsxTexts.forEach(jsxText => {
        const textValue = jsxText.getText();
        if (getRegex().test(textValue)) {
            const parts = textValue.split(getRegex());
            let newJsx = '';
            for (let i = 0; i < parts.length; i++) {
                if (i % 2 === 1) { 
                    const cleaned = parts[i].replace(/\\\\/g, '\\');
                    newJsx += `<MathComponent math={${JSON.stringify(cleaned)}} />`;
                } else { 
                    newJsx += parts[i];
                }
            }
            jsxText.replaceWithText(newJsx);
            modified = true;
            totalReplaced++;
        }
    });

    const jsxExprs = sourceFile.getDescendantsOfKind(SyntaxKind.JsxExpression);
    jsxExprs.forEach(expr => {
        const inner = expr.getExpression();
        if (inner && (inner.isKind(SyntaxKind.StringLiteral) || inner.isKind(SyntaxKind.NoSubstitutionTemplateLiteral))) {
            const textValue = inner.getLiteralValue();
            if (getRegex().test(textValue)) {
                const parts = textValue.split(getRegex());
                let newJsx = '';
                let hasMathSegment = false;
                for (let i = 0; i < parts.length; i++) {
                    if (i % 2 === 1) { 
                        newJsx += `<MathComponent math={${JSON.stringify(parts[i])}} />`;
                        hasMathSegment = true;
                    } else {
                        if (parts[i]) {
                            newJsx += `{${JSON.stringify(parts[i])}}`;
                        }
                    }
                }
                
                if (hasMathSegment) {
                    expr.replaceWithText(`<>${newJsx}</>`);
                    modified = true;
                    totalReplaced++;
                }
            }
        }
    });

    if (modified) {
        sourceFile.saveSync();
        console.log(`Updated ${sourceFile.getBaseName()}`);
    }
});

console.log(`Replaced occurrences in ${totalReplaced} places.`);
