module.exports = {
    name: "loop",
    description: "Loop!",
    async execute(message, config, sQueue) {
        if (!message.member.voice.channel) return message.reply(":x: | You have to be in a voice channel to use this command!");
        if (message.guild.me.voice.channel && (message.member.voice.channelId != message.guild.me.voice.channelId)) return message.reply(`:x: - You must be listening in **${message.guild.me.voice.channel.name}** to use that!`);
        if(message.member.voice.deaf || message.member.voice.selfDeaf)return message.reply(`**:x: - You cannot run this command while deafened!**`);
        if(message.guild.me.voice.mute)return message.reply(`**:x: - Unmute me to use this command!**`);
        if (!sQueue || !sQueue.songs || sQueue.songs.length == 0) return message.reply(":x: | There is no song that I could loop!");
        if (sQueue.loop) {
            sQueue.loop = false
            message.reply("🔂 **Disabled!**")
        } else {
            sQueue.loop = true
            message.reply("🔂 **Enabled!**")
        }
    },
};