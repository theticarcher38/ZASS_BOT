import { SlashCommandBuilder } from '../../exports';
import { console } from 'terminal-styling';
import fs from 'fs';
import guilds from '../../data/groups.json';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-group')
		.setDescription('removes a user managed group')
		.addStringOption((option: { setName: (arg0: string) => any;}) =>
			option.setName('group-name')
				.setDescription('Name of group to remove')
				.setRequired(true)),
	async execute(interaction: any) {

	},
};

