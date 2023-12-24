import { Command } from 'commander';

import { readFileSync } from 'fs';
const program: Command = new Command();
program.option('-f, --file <file>', 'file to be processed');
program.parse();


const dictionary: { [key: string]: string } = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
};

(() => {
    const filePath = program.opts().file;
    const fileContent = readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const result = lines.reduce((p, curr) => {
        const values = Object.values(
            Object.keys(dictionary).reduce((p, c) => {
                [...curr.matchAll(new RegExp(`${c}|${dictionary[c]}`, 'g'))].forEach(m => {
                    p[m.index] = dictionary[c];
                })
                return p;
            }, {})
        )
        const val = parseInt(`${values[0]}${values[values.length - 1]}`, 10);

        return p + val;
    }, 0);
    console.info(`result: ${result}`);
})();
