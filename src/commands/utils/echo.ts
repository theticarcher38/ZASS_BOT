import { SlashCommandBuilder } from '../../exports';
import { console } from 'terminal-styling';
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with user input')
		.addStringOption((option: { setName: (arg0: string) => any; }) =>
			option.setName('input-string')
				.setDescription('The input to echo back')
				.setRequired(true)),

	/**
	 * It takes the input from the user, and then sends it back to them
	 * @param {any} interaction - The interaction object.
	 */
	async execute(interaction: any) {
		const input = interaction.options.getString('input-string');
		const embed = new MessageEmbed()
			.setTitle('Echo')
			.setAuthor(interaction.member.displayName)
			.addField('Message:', `${input}`)
			.setTimestamp();
		try {
			await interaction.reply({ embeds: [embed] });
		}
		catch (err) {
			console.err(`[ErrorLogs] ${err}`);
		}
	},
};