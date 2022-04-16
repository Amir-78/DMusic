module.exports = {
    name: "vol",
    description: "Vol!",
    async execute(message, config, sQueue) {
        if (!message.member.voice.channel) return message.reply({content: ":x: | You have to be in a voice channel to use this command!"});
        if (message.guild.me.voice.channel && (message.member.voice.channelId != message.guild.me.voice.channelId)) return message.reply({content: `:x: - You must be listening in **${message.guild.me.voice.channel.name}** to use that!`});
        if (message.member.voice.deaf || message.member.voice.selfDeaf) return message.reply({content: `**:x: - You cannot run this command while deafened!**`});
        if (message.guild.me.voice.mute) return message.reply({content: `**:x: - Unmute me to use this command!**`});
        let number = Number(message.content.split(' ')[1]).toFixed();
        if (!number || number < 0 || number > 150 || number == 0) {
            return message.reply({content: "**:x: - Write number between 1 - 150**"})
        }
        sQueue.volume_set.setVolume(number / 100);
        sQueue.volume = number;
        message.reply({content: `🔊 ** - Volume has been changed to ${number}%**`})
    },
};