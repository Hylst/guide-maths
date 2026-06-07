import { Project, SyntaxKind } from 'ts-morph';

const project = new Project();
project.addSourceFilesAtPaths('src/courses/Course_College_3eme_01_Theoreme_Thales.tsx');
const sourceFile = project.getSourceFiles()[0];

const jsxTexts = sourceFile.getDescendantsOfKind(SyntaxKind.JsxText);
jsxTexts.forEach(jsxText => {
    const textValue = jsxText.getText();
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
        console.log("Original text:", JSON.stringify(textValue));
        console.log("Transformed:", newJsx);
        console.log("---------------");
    }
});
