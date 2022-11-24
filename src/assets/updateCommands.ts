import fs from 'fs';
import { console } from 'terminal-styling';

fs.readFileSync('./commands.json');


    fs.readdirSync('../commands').forEach((dir: string) => {
        const commandFiles = fs.readdirSync(`../commands/${dir}`).filter((file: string) => file.endsWith('.ts'));
    
        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`)
    
            fs.appendFile('./commands.json', 
            `
            "${command.data.name}": {
                "description": "${command.data.description}"
            },
            `, 
                function(err: any) {
                    if (err) console.err(err);
                }
            )
        }
    })
