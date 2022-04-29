import { console } from 'terminal-styling';
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config/config.json');
const dotenv = require('dotenv');
dotenv.config({ path: "./config/.env" });
const ascii = require('ascii-table')

let table_development = new ascii('Development Commands');
let table_build = new ascii('Build Commands')
table_development.setHeading("Name", "Category", "Description", "Options", "Permissions");
table_build.setHeading("Name", "Category", "Description", "Options", "Permissions");

const clientId = config.CLIENT_ID;
const guildId = config.GUILD_ID;
const token = process.env.TOKEN;

const commands: any[] = []
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

fs.readdirSync('./commands/').forEach((dir: any) => {
    const commandFiles = fs.readdirSync(`./commands/${dir}`).filter((file: string) => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        // console.info(`${file.replace(/\.[^/.]+$/, "")} of ${dir} successfully registered.`);
        commands.push(command.data.toJSON());
        var optionDescription = JSON.stringify(command.data.options.description);
            table_development.addRow(capitalizeFirstLetter(command.data.name), capitalizeFirstLetter(dir), command.data.description, command.data.options, command.data.permissions);
            table_build.addRow(capitalizeFirstLetter(command.data.name), capitalizeFirstLetter(dir), command.data.description, command.data.options, command.data.permissions);
    }
})

const rest = new REST({ version: '9' }).setToken(token);
var i = 0;

while (i < commands.length) {
    fs.writeFile('./data/command_data.json', `
    {}
    `, function(err: any) {
            if (err) throw err;
        });
    fs.appendFile('./data/command_data.json', `
    {
        ${JSON.stringify(commands[i].name)}: {
            "description": ${JSON.stringify(commands[i])},
        },
    }
    `)
    i++;
}
(async () => {
    try {
        if (!guildId) {
            await rest.put(
                Routes.applicationCommands(clientId), {
                    body: commands
                },
            );
            console.info(table_build.toString());
        } else {
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId), {
                    body: commands
                },
            );
            console.info(table_development.toString());
        }
    } catch (err) {
        if (err) console.err(err);
    }
})();