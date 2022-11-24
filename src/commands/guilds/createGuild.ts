import { SlashCommandBuilder } from '../../exports';
import { console } from 'terminal-styling';
import fs from 'fs';
import { Options } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-group')
		.setDescription('Creates a user managed group')
		.addStringOption((option: { setName: (arg0: string) => any;}) =>
			option.setName('group-name')
				.setDescription('Name of the group')
				.setRequired(true)),
	async execute(interaction: any) {
		fs.writeFile('./data/groups.json', `
        {
            "groups": [
                {
                    "${interaction.options.getString('group-name')}": {}
                }
            ]
        }
        `, function(err: any) {
			if (err) throw err;
		});
	},
};