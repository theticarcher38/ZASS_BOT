/**
 * Send Embed command
 *
 * Sends embed to channel with desired text, as well as desired color for the embed.
 *
 * ! Author: Hunter Goodman
 */

import { SlashCommandBuilder } from '../../exports';
import { console } from 'terminal-styling';
import { MessageEmbed } from 'discord.js';
import colors from '../../assets/colors.json';
// import { colorConverter } from '../../assets/embedColor';
import { Embed } from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Sends message embed to desired channel')
		.addStringOption((option: { setName: (arg0: string) => any;}) =>
			option.setName('embed-title')
				.setDescription('The title for the embed')
				.setRequired(true))
		.addStringOption((option: { setName: (arg0: string) => any;}) =>
			option.setName('embed-description')
				.setDescription('Sets the description for the embed')
				.setRequired(true))
		.addStringOption((option: { setName: (arg0: string) => any;}) =>
			option.setName('embed-color')
				.setDescription('Enter the number for the desired color')
				.setRequired(false)),

	/**
     *
     * @param interaction(colors.color[embedColor]
     */
	async execute(interaction: any) {
		const embedTitle = interaction.options.getString('embed-title');
		const embedDesc = interaction.options.getString('embed-description');
		let embedColor = interaction.options.getString('embed-color').toLowerCase();

		for (let i = 0; i < colors.color.length; i++) {
			switch (embedColor) {
				case colors.color[i]:
					embedColor = colors.color[i];
					break;
				default:
					embedColor;
					break;
			}
		}

		switch (embedColor) {
			case colors.color[0]:
				embedColor = colors.color[0];
				break;
			case colors.color[1]:
				embedColor = colors.color[1];
				break;
			case colors.color[2]:
				embedColor = colors.color[2];
				break;
			case colors.color[3]:
				embedColor = colors.color[3];
				break;
			case colors.color[4]:
				embedColor = colors.color[4];
				break;
			case colors.color[5]:
				embedColor = colors.color[5];
				break;
			case colors.color[6]:
				embedColor = colors.color[6];
				break;

		}
		console.info(`case ${colors.color[0]}`);

		/**
         * Switch case to take text value from embed color input
         * and convert it to the hex value to use the color
         */
		// switch (embedColor) {
		// case 'indian red':
		// 	embedColor = '#CD5C5C';
		// 	break;
		// case 'light coral':
		// 	embedColor = '#F08080';
		// 	break;
		// case 'salmon':
		// 	embedColor = '#FA8072';
		// 	break;
		// case 'dark salmon':
		// 	embedColor = '#E9967A';
		// 	break;
		// case 'light salmon':
		// 	embedColor = '#FFA07A';
		// 	break;
		// case 'crimson':
		// 	embedColor = '#DC143C';
		// 	break;
		// case 'red':
		// 	embedColor = '#FF0000';
		// 	break;
		// case 'fire brick':
		// 	embedColor = '#B22222';
		// 	break;
		// case 'dark red':
		// 	embedColor = '#8B0000';
		// 	break;
		// case 'pink':
		// 	embedColor = '#FFC0CB';
		// 	break;
		// case 'light pink':
		// 	embedColor = '#FFB6C1';
		// 	break;
		// case 'hot pink':
		// 	embedColor = '#FF69B4';
		// 	break;
		// default:
		// 	embedColor;
		// 	break;
		// }

		/**
         * Sets up embed for command
         */
		const embed = new MessageEmbed()
			.setTitle(embedTitle)
			.setAuthor(interaction.member.displayName)
			.setDescription(embedDesc)
			.setColor(embedColor);

		try {
			await interaction.reply({ embeds: [embed] });
		}
		catch (err) {
			console.err(`[ErrorLogs] ${err}`);
		}
		console.info(embedColor);
	},
};