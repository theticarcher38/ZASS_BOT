import { SlashCommandBuilder } from '../../exports';
import { console } from 'terminal-styling';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import cmd from '../../assets/commands.json';
import colors from '../../assets/colors.json';
import fs from 'fs';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays help message'),

	/**
	 * It sends a message to the channel the command was used in
	 * @param {any} interaction - This is the interaction object that is passed to the execute function.
	 */
	async execute(interaction: any) {

		const embed = new MessageEmbed()
			.setTitle('Help');
		try {
			await interaction.reply({ embeds: [embed] });
		}
		catch (err) {
			console.err(`[ErrorLogs] ${err}`);
		}
	},

};