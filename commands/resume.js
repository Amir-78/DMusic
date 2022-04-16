module.exports = {
    name: "resume",
    description: "Resume!",
    async execute(message, config, sQueue) {
        if (!message.member.voice.channel) return message.reply({content: ":x: | You have to be in a voice channel to use this command!"});
        if (message.guild.me.voice.channel && (message.member.voice.channelId != message.guild.me.voice.channelId)) return message.reply({content: `:x: - You must be listening in **${message.guild.me.voice.channel.name}** to use that!`});
        if(message.member.voice.deaf || message.member.voice.selfDeaf)return message.reply({content: `**:x: - You cannot run this command while deafened!**`});
        if(message.guild.me.voice.mute)return message.reply({content: `**:x: - Unmute me to use this command!**`});
        if (!sQueue || !sQueue.songs || sQueue.songs.length == 0) return message.reply({content: ":x: | There is no songs!"});
        sQueue.player.unpause();
        message.reply({content: "⏯️ **Playing**!"})
    },
};