import { Command } from 'commander';

import { readFileSync } from 'fs';
const program: Command = new Command();
program.option('-f, --file <file>', 'file to be processed');
program.parse();


const regexGame = /Game (?<id>\d*): (?<data>.*)/;
const extractGame = (line: string): { id: number, result: { [key: string]: number } } => {
    const { id, data } = regexGame.exec(line)?.groups;
    const result = data.split(/;\s?/).reduce((prev, curr) => {
        const launches = curr.split(/,\s?/).reduce((p, c) => {
            const [value, color] = c.split(/\s/);
            p[color] = (p[color] || 0) + parseInt(value, 10);
            return p;
        }, {})
        
        Object.keys(prev).forEach(k => {
            prev[k] = Math.max(prev[k], launches[k] || 0) 
        });

        return prev

    }, {red: 0, green: 0, blue: 0})

    return { id: parseInt(id, 10), result };
}

(() => {
    const filePath = program.opts().file;
    const fileContent = readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const result = lines.map(l => extractGame(l))
        .filter(({ result }) => result.red <= 12 && result.green <= 13 && result.blue <= 14)
        .reduce((prev, { id }) => {
            return prev + id

        }, 0)
    console.info(`result: ${result}`);
})();
