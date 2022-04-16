const Discord = require("discord.js");
module.exports = {
    name: "np",
    description: "Np!",
    async execute(message, config, sQueue) {
        if (!message.member.voice.channel) return message.reply({content: ":x: | You have to be in a voice channel to use this command!"});
        if (message.guild.me.voice.channel && (message.member.voice.channelId != message.guild.me.voice.channelId)) return message.reply({content: `:x: - You must be listening in **${message.guild.me.voice.channel.name}** to use that!`});
        if(message.member.voice.deaf || message.member.voice.selfDeaf)return message.reply({content: `**:x: - You cannot run this command while deafened!**`});
        if(message.guild.me.voice.mute)return message.reply({content: `**:x: - Unmute me to use this command!**`});
        if (!sQueue || !sQueue.songs || sQueue.songs.length == 0) return message.reply({content: ":x: | There is no songs!"});
        let time = "`" + `${sQueue.songs[0].duration_h}:${sQueue.songs[0].duration_m}:${sQueue.songs[0].duration_s}` + "`"
        if(sQueue.songs[0].duration_m.length == 1){
            sQueue.songs[0].duration_m = "0" + sQueue.songs[0].duration_m
        }
        if(sQueue.songs[0].duration_s.length == 1){
            sQueue.songs[0].duration_s = "0" + sQueue.songs[0].duration_s
        }
        if(sQueue.songs[0].duration_h.length == 1){
            sQueue.songs[0].duration_h = "0" + sQueue.songs[0].duration_h
        }
        if(sQueue.songs[0].duration_h == 0){
            time = `${sQueue.songs[0].duration_m}:${sQueue.songs[0].duration_s}`
        }
        if(sQueue.songs[0].duration_m == 0 && sQueue.songs[0].duration_s == 0){
            time = "";
        }
        let embed = new Discord.MessageEmbed()
            .setTitle("⏯️ - Playing now!")
            .setThumbnail(sQueue.songs[0].thumbnail)
            .setDescription(`**${sQueue.songs[0].title}** - ${time}`)
            .setFooter({ text:`Request by: ${message.member.user.tag} - Github: github.com/Amir-78`, iconURL: message.member.displayAvatarURL({dynamic: true})})
        message.reply({ embeds: [embed] })
    },
};