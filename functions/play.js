const { createAudioPlayer, getVoiceConnection, createAudioResource, StreamType, AudioPlayerStatus } = require("@discordjs/voice");
const ytdl = require("ytdl-core");

function play(queue, guild, video) {
    const sQueue = queue.get(guild.id);
    if (!video) {
        sQueue.connection.destroy();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(video.url, { filter: 'audioonly' });


    let resource = createAudioResource(stream,
        {
            inputType: StreamType.Arbitrary,
            inlineVolume: true,
        });

    const player = createAudioPlayer();
    player.on('error', error => {
        console.error('Error:', error.message, 'with track', error.resource.metadata.title);
    });

    player.on('subscribe', l => {
    })
    player.on('unsubscribe', l => {
        try {
            if (sQueue.loop) {
                sQueue.songs.push(sQueue.songs[0]);
                sQueue.songs.shift();
            }
            if (sQueue.skip) {
                sQueue.skip = false;
                sQueue.songs.shift();
                play(queue, guild, sQueue.songs[0]);
            }
            if(sQueue.replay){
                sQueue.replay = false;
                sQueue.songs.push(sQueue.songs[0]);
                sQueue.songs.shift();
                play(queue, guild, sQueue.songs[0]);
            }

        } catch (e) {
            console.log(e)
        }
    })



    player.play(resource)
   sQueue.player = player;

    let connection = getVoiceConnection(guild.id);
    sQueue.subscription = connection.subscribe(player)
    resource.volume.setVolume(sQueue.volume / 100);
    sQueue.volume_set = resource.volume;
    player.on(AudioPlayerStatus.Idle, () => {
        if (sQueue.loop) {
            sQueue.songs.push(sQueue.songs[0]);
        }
        sQueue.songs.shift();
        play(queue, guild, sQueue.songs[0]);
    }).on("error", error => console.error(error));
    if (!sQueue.loop) {
        sQueue.textChannel.send({content: `🎶 Playing **${video.title}**`});
    }
}
module.exports = { play }
