import { SlashCommandBuilder } from "../../exports";
import { console } from 'terminal-styling';
const { MessageEmbed } = require('discord.js');
const colorFile = require('../../assets/colors.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Sends message Embed to desired channel')
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
                .setDescription('Enter the hex code of the desired color')
                .setRequired(false)),

    async execute(interaction: any) {
        const colors = colorFile.data
        const embedTitle = interaction.options.getString('embed-title');
        const embedDesc = interaction.options.getString('embed-description');
        var embedColor = interaction.options.getString('embed-color').toLowerCase();

        for (var i = 0; i < colors.length; i++) {
            if (embedColor = colors[i]) {
                embedColor = colors.embedColor;
            }
        }

        // switch (embedColor) {
        //     case "red":
        //         embedColor = colors.red;
        //         break;
        //     case "pink":
        //         embedColor = colors.pink;
        //         break;
        //     default: 
        //         var embedColor = interaction.options.getString('embed-color').toLowerCase();
        //         break;
        // }
            var embed = new MessageEmbed()
            .setTitle(embedTitle)
            .setDescription(embedDesc)
            .setColor(embedColor)
        
        try {
            await interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.err(`[ErrorLogs] ${err}`);
        }
    }
}