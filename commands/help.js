const Discord = require("discord.js");
module.exports = {
    name: "help",
    description: "Help!",
    async execute(message, config) {

        let commands = ["play (p)", "pause", "clear (clean)", "loop (repeat)", "lyrics (l)", "move", "np", "skip (s)", "stop (leave)", "volume (vol)", "search", "resume", "queue (q)", "remove", "replay"]
        let embed = new Discord.MessageEmbed()
            .setTitle("Bot Commands 🎶")
            .setColor("#00ff00")
            .setDescription(`**🎵 Music commands:**\n\n${commands.map(c => "`" + config.BOT_PREFIX + c + "`").join(" ")}`)
            .setFooter({ text:`Request by: ${message.member.user.tag} - Github: github.com/Amir-78`, iconURL: message.member.displayAvatarURL({dynamic: true})})
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL("https://github.com/Amir-78")
                    .setLabel('Github')
                    .setStyle('LINK'),
            );
        message.reply({ embeds: [embed], components: [row] })

    },
};