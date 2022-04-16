const Discord = require("discord.js");
const { getLyrics } = require("../functions/getLyrics");

module.exports = {
    name: "lyrics",
    description: "Lyrics!",
    async execute(message, config, sQueue) {
        if (!message.member.voice.channel) return message.reply({content: ":x: | You have to be in a voice channel to use this command!"});
        if (message.guild.me.voice.channel && (message.member.voice.channelId != message.guild.me.voice.channelId)) return message.reply({content: `:x: - You must be listening in **${message.guild.me.voice.channel.name}** to use that!`});
        if(message.member.voice.deaf || message.member.voice.selfDeaf)return message.reply({content: `**:x: - You cannot run this command while deafened!**`});
        if(message.guild.me.voice.mute)return message.reply({content: `**:x: - Unmute me to use this command!**`});
        if (!sQueue || !sQueue.songs || sQueue.songs.length == 0) return message.reply({content: ":x: | There is no song!"});
        let Lyrics = Discord.Util.splitMessage(await getLyrics(sQueue.songs[0].title), { maxLength: 2000 })
        for (var i = 0; i < Lyrics.length; i++) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${sQueue.songs[0].title} Lyrics`)
                .setThumbnail(message.guild.iconURL())
                .setDescription("```" + Lyrics[i] + "```")
                .setFooter("Github: github.com/Amir-78")
            message.reply({ embeds: [embed] })
        }
    },
};