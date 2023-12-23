import { Command } from 'commander';

import { readFileSync } from 'fs';
const program: Command = new Command();
program.option('-f, --file <file>', 'file to be processed');
program.parse();



(() => {
    const filePath = program.opts().file; 
    const fileContent = readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const result = lines.map(line => 
        [...line].map(c => parseInt(c)).filter(c => !isNaN(c))
    ).reduce((p, curr) => {
        const val = parseInt(`${curr[0]}${curr[curr.length - 1]}`, 10);
        return p + val;
    }, 0);
    console.info(`result: ${result}`);
})()
