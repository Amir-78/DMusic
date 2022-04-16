const { parseURL } = require('simple-youtube-api/src/util');
const { joinVoiceChannel } = require('@discordjs/voice');
const { video_info } = require('../utils/videoinfo');
const { search } = require('../utils/search');
const { play } = require('../functions/play');
const { getPlaylistVideos } = require('../functions/getPlaylistVideos');
module.exports = {
    name: "play",
    description: "Play music",
    async execute(message, config, sQueue, queue) {
        const args = message.content.split(" ");

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.reply({content: "You need to be in a voice channel to play music!"});
        const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!message.member.voice.channel) return message.reply({content: ":x: | You have to be in a voice channel to stop the music!"});
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.reply({content: "I need the permissions to join and speak in your voice channel!"});
        }

        if (message.guild.me.voice.channel && (message.member.voice.channelId != message.guild.me.voice.channelId)) return message.reply({content: `:x: - You must be listening in **${message.guild.me.voice.channel.name}** to use that!`});
        if(message.member.voice.deaf || message.member.voice.selfDeaf)return message.reply({content: `**:x: - You cannot run this command while deafened!**`});
        if(message.guild.me.voice.mute)return message.reply({content: `**:x: - Unmute me to use this command!**`});
        if(!args[1]){
return message.reply({content: "**:x: - Youtube URL / Keyword required!**"})
        }
        let v_id = parseURL(args[1]).video
        if (!v_id) {
            let s_search = await search(args.slice(1).join(' '), 1)
            if (s_search[0]) {
                v_id = s_search[0].id
            } else {
                return message.reply({content: '**:x: - No results found!**'});
            }
        }
        const videoInfo = await video_info(v_id);
        const video = {
            title: videoInfo.title,
            url: videoInfo.url,
            channel: videoInfo.channel.title,
            thumbnail: videoInfo.thumbnails.default.url,
            duration_s: videoInfo.duration.seconds,
            duration_m: videoInfo.duration.minutes,
            duration_h: videoInfo.duration.hours,
            add_by: message.member.user.tag         
        };
        if (!sQueue) {
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 100,
                volume_set: null,
                player: null,
                subscription: null,
                loop: false,
                skip: false,
                replay: false
            };
            queue.set(message.guild.id, queueContruct);
            queueContruct.songs.push(video);
            if(parseURL(args[1]).playlist){
                let playlistVideos = await getPlaylistVideos(parseURL(args[1]).playlist);
                for(var i = 1; i < playlistVideos.length; i++){
                    let vvideo = {
                        title: playlistVideos[i].title,
                        url: playlistVideos[i].url,
                        channel: playlistVideos[i].channel.title,
                        thumbnail: "",
                        duration_s: 0,
                        duration_m: 0,
                        duration_h: 0,
                        add_by: message.member.user.tag   
                    };
                    queueContruct.songs.push(vvideo);
                }
            }

            try {
                var connection = await joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator
                })
                queueContruct.connection = connection;
                play(queue, message.guild, queueContruct.songs[0]);
            } catch (err) {
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send({content: err.message});
            }
        } else {
            sQueue.songs.push(video);
            if(parseURL(args[1]).playlist){
                let playlistVideos = await getPlaylistVideos(parseURL(args[1]).playlist);
                for(var i = 1; i < playlistVideos.length; i++){
                    let vvideo = {
                        title: playlistVideos[i].title,
                        url: playlistVideos[i].url,
                        channel: playlistVideos[i].channel.title,
                        thumbnail: "",
                        duration_s: 0,
                        duration_m: 0,
                        duration_h: 0 ,
                        add_by: message.member.user.tag         
                    };
                    queueContruct.songs.push(vvideo);
                }
            }
            return message.channel.send({content: `⏯️ **${video.title}** has been added to the queue!`});
        }
    },
};