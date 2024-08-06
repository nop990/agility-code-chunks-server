const prettier = require('prettier');
const typescript = require('prettier/plugins/typescript');
const babel = require('prettier/plugins/babel');
const estree = require('prettier/plugins/estree');
const html = require('prettier/plugins/html');
const markdown = require('prettier/plugins/markdown');
const postcss = require('prettier/plugins/postcss');
const yaml = require('prettier/plugins/yaml');

async function formatCode(code, language) {
    console.log("Formatting code:", code, language);
    try {
        let parser = language;
        
        code = await prettier.format(code, {
            organizeImportsSkipDestructiveCodeActions: true,
            parser: parser,
            plugins: [typescript, babel, estree, html, markdown, postcss, yaml, 'prettier-plugin-java'],
            tabWidth: 4,
            useTabs: true,
            semi: true,
            singleQuote: false,
            trailingComma: "none",
            bracketSpacing: true,
            arrowParens: "always"
        });

        return code;
    } catch (error) {
        console.error("Error formatting code:", error);
        return code;
    }
}

module.exports = { formatCode };
