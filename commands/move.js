module.exports = {
    name: "move",
    description: "Move!",
    async execute(message, config, sQueue) {
        if (!message.member.voice.channel) return message.reply(":x: | You have to be in a voice channel to stop the music!");
        if (!sQueue || !sQueue.songs || sQueue.songs.length == 0) return message.reply(":x: | There is no songs!");
        let number = Number(message.content.split(' ')[1]);
        if (!number || number > (sQueue.songs.length - 1) || number == 0) {
            return message.reply(":x: - Bad Number");
        }
        message.reply(`:white_check_mark: **${sQueue.songs[number].title}** moved to position **1**!`)
        move_elm(sQueue.songs, number, 1);
    },
};

function move_elm(array, from, to) {
    var element = array[from];
    array.splice(from, 1);
    array.splice(to, 0, element);
}