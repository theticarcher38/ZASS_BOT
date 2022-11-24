import { SlashCommandBuilder } from '../../exports';
import { console } from 'terminal-styling';
import colors from '../../assets/colors.json';
import fs from 'fs';
import { MessageEmbed } from 'discord.js';
import guilds from '../../data/groups.json';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server-info')
		.setDescription('displays server info'),


	/**
	 * It sends an embed with the guild's name, total members, and total groups
	 * @param {any} interaction - This is the interaction object that is passed to the command.
	 */
	async execute(interaction: any) {
		/* Creating a new embed with the guild's name, total members, and total groups. */
		const embed = new MessageEmbed()
			.setTitle(`${interaction.guild.name}'s Info`)
			.addFields(
				{ name: 'Total Members', value: `${interaction.guild.memberCount}` },
				{ name: 'Total Groups', value: `${guilds.groups.length}` }

				)

		try {
			await interaction.reply({ embeds: [embed] });
		}
		catch (err) {
			console.err(`[ErrorLogs] ${err}`);
		}
	},
};