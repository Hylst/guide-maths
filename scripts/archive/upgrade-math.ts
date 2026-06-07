import { Project, SyntaxKind } from 'ts-morph';
import path from 'path';

const project = new Project();
project.addSourceFilesAtPaths('src/courses/**/*.tsx');

let totalReplaced = 0;

project.getSourceFiles().forEach(sourceFile => {
    let modified = false;

    // Check if we have anything to replace
    let hasMath = false;
    
    // Visit JsxTexts
    const jsxTexts = sourceFile.getDescendantsOfKind(SyntaxKind.JsxText);
    for (const jsxText of jsxTexts) {
        if (/(?<!\\)\$/g.test(jsxText.getText())) hasMath = true;
    }
    
    // Visit Expressions
    const jsxExprs = sourceFile.getDescendantsOfKind(SyntaxKind.JsxExpression);
    for (const expr of jsxExprs) {
        const inner = expr.getExpression();
        if (inner && (inner.isKind(SyntaxKind.StringLiteral) || inner.isKind(SyntaxKind.NoSubstitutionTemplateLiteral))) {
            const textValue = inner.getLiteralValue();
            if (/(?<!\\)\$/g.test(textValue)) hasMath = true;
        }
    }
    
    if (!hasMath) return; // Skip files without any $ math

    // Add import if needed
    const hasMathComponent = sourceFile.getImportDeclarations().some(imp => 
        imp.getModuleSpecifierValue().includes('MathComponent')
    );
    if (!hasMathComponent) {
        sourceFile.addImportDeclaration({
            namedImports: ['MathComponent'],
            moduleSpecifier: '../components/MathComponent'
        });
        modified = true;
    }

    const regex = /(?<!\\)\$((?:[^$]|\\\$)+?)(?<!\\)\$/g;

    // Replace in JsxText
    jsxTexts.forEach(jsxText => {
        const textValue = jsxText.getText();
        if (regex.test(textValue)) {
            const parts = textValue.split(regex);
            let newJsx = '';
            for (let i = 0; i < parts.length; i++) {
                if (i % 2 === 1) { 
                    // Clean up double slashes caused by previous script
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

    // Replace in JsxExpression
    jsxExprs.forEach(expr => {
        const inner = expr.getExpression();
        if (inner && (inner.isKind(SyntaxKind.StringLiteral) || inner.isKind(SyntaxKind.NoSubstitutionTemplateLiteral))) {
            const textValue = inner.getLiteralValue();
            if (regex.test(textValue)) {
                const parts = textValue.split(regex);
                let newJsx = '';
                let hasMathSegment = false;
                for (let i = 0; i < parts.length; i++) {
                    if (i % 2 === 1) { 
                        newJsx += `<MathComponent math={${JSON.stringify(parts[i])}} />`;
                        hasMathSegment = true;
                    } else {
                        if (parts[i].trim() !== '') {
                            // Non-math part. We need to wrap it in a string if it's text
                            // But since this replaces an expression inside JSX, we can just output plain test
                            // Actually, if we output plain text, we must wrap it in {""} or put it directly outside!
                            // Wait, if it's `<>${newJsx}</>`, plain text inside Fragments is fine, BUT we must escape { and <
                            // Safest is to just put it in a JS string literal block.
                            newJsx += `{${JSON.stringify(parts[i])}}`;
                        } else {
                            // If it's just spaces, we can just put the space as is or inside string literal
                            // let's put inside string literal to be safe
                            if (parts[i]) newJsx += `{${JSON.stringify(parts[i])}}`;
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
