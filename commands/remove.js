module.exports = {
    name: "remove",
    description: "Remove!",
    async execute(message, config, sQueue) {
        if (!message.member.voice.channel) return message.reply(":x: | You have to be in a voice channel to use this command!");
        if (message.guild.me.voice.channel && (message.member.voice.channelId != message.guild.me.voice.channelId)) return message.reply(`:x: - You must be listening in **${message.guild.me.voice.channel.name}** to use that!`);
        if(message.member.voice.deaf || message.member.voice.selfDeaf)return message.reply(`**:x: - You cannot run this command while deafened!**`);
        if(message.guild.me.voice.mute)return message.reply(`**:x: - Unmute me to use this command!**`);
        if (!sQueue || !sQueue.songs || sQueue.songs.length == 0) return message.reply(":x: | There is no songs!");
        let number = Number(message.content.split(' ')[1]);
        if (!number || number > (sQueue.songs.length - 1) || number == 0) {
            return message.reply(":x: - Bad Number");
        }
        message.reply(`🗑️ **${sQueue.songs[number].title}** removed from queue!`)
        sQueue.songs.splice(number, 1);
    },
};