import { console } from 'terminal-styling';
import { createSpinner } from 'nanospinner';
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: './config/.env' });
const config = require('./config/config.json');
const token = process.env.TOKEN;
const guildId = config.GUILD_ID;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

export const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const spinner = createSpinner('loading bot').start();

client.commands = new Collection();

/**
 * Description
 *
 * @constant
 * @name fs
 * @type {any}
 */
fs.readdirSync('./commands/').forEach((dir: any) => {
	const commandFiles = fs.readdirSync(`./commands/${dir}`).filter((file: string) => file.endsWith('.ts'));

	for (const file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);
		client.commands.set(command.data.name, command);
	}
});
/**
 * Description
 *
 * @constant
 * @name client
 * @type {any}
 */
client.once('ready', () => {
	(async () => {
		try {
			if (!guildId) {
				spinner.success({ text: `${client.user.tag} realeased successfully for Production` });
				await sleep();
				client.user.setActivity('Production Build', { type: 'PLAYING' });
			}
			else {
				spinner.success({ text: `${client.user.tag} realeased successfully for Development` });
				await sleep();
				client.user.setActivity('Under Development', { type: 'PLAYING' });
			}
		}
		catch (err) {
			spinner.error({ text: `${err.message}` });
			await sleep();
		}
	})();
});

/**
 * Description
 *
 * @async
 * @constant
 * @name client
 * @type {any}
 */
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (err) {
		console.err(err);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.login(token);