import { SlashCommandBuilder } from "../../exports";
import { console } from 'terminal-styling';
const { MessageEmbed } = require('discord.js');


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
                // .addChoice("Indian Red", "#CD5C5C")
                // .addChoice("Light Coral", "#F08080")
                // .addChoice("Salmon", "#FA8072")
                .setRequired(false)),

    async execute(interaction: any) {
        const embedTitle = interaction.options.getString('embed-title');
        const embedDesc = interaction.options.getString('embed-description');
        const embedColor = interaction.options.getString('embed-color');
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