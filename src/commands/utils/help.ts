import { SlashCommandBuilder } from "../../exports";
import { console } from "terminal-styling";
const { MessageEmbed } = require("discord.js");
const colors = require("../../assets/colors.json");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays help message"),
    async execute(interaction: any) {
        var embed = new MessageEmbed()
            .setTitle("Help")
            fs.readdirSync('./commands/').forEach((dir: any) => {
                const commandFiles = fs.readdirSync(`./commands/${dir}`).filter((file: string) => file.endsWith('.ts'));
            
                for (const file of commandFiles) {
                    const command = require(`./commands/${dir}/${file}`);
                    // console.info(`${file.replace(/\.[^/.]+$/, "")} of ${dir} successfully registered.`);
                    const commandName = command.data.name;
                    const commandDescription = command.data.description;
                    embed.addField(commandName, commandDescription);
                }
            })

        try {
            await interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.err(`[ErrorLogs] ${err}`);
        }
    }
    
}