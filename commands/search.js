const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);
const { parseURL } = require('simple-youtube-api/src/util');
const { joinVoiceChannel } = require('@discordjs/voice');
const { video_info } = require('../utils/videoinfo');
const { search } = require('../utils/search');
const { play } = require('../functions/play');
module.exports = {
    name: "search",
    description: "Search!",
    async execute(client, message, config, sQueue, queue) {


        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.reply("You need to be in a voice channel to play music!");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!message.member.voice.channel) return message.reply(":x: | You have to be in a voice channel to stop the music!");
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.reply("I need the permissions to join and speak in your voice channel!");
        }

        if (message.guild.me.voice.channel && (message.member.voice.channelId != message.guild.me.voice.channelId)) return message.reply(`:x: - You must be listening in **${message.guild.me.voice.channel.name}** to use that!`);
        if (message.member.voice.deaf || message.member.voice.selfDeaf) return message.reply(`**:x: - You cannot run this command while deafened!**`);
        if (message.guild.me.voice.mute) return message.reply(`**:x: - Unmute me to use this command!**`);
        if (!message.content.split(' ')[1]) {
            return message.reply("**:x: - Youtube URL / Keyword required!**")
        }

        let search_res = await search(message.content.split(' ').slice(1).join(' '), 10);

        if (search_res.length == 0) {
            return message.reply("**:x: - No results!**")
        }
        let results = [];
        for (var i = 0; i < search_res.length; i++) {
            results.push({
                label: search_res[i].title,
                description: search_res[i].channel.title,
                value: search_res[i].id
            })
        }

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('search')
                    .setPlaceholder('Nothing selected')
                    .addOptions(results),
            );

        await message.reply({ content: '**Search results!**', components: [row] });

        client.once('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;
            if (interaction.customId == "search") {
                interaction.message.delete()
                let v_id = interaction.values[0]
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
                        textChannel: interaction.channel,
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
                    queue.set(interaction.guild.id, queueContruct);
                    queueContruct.songs.push(video);

                    try {
                        var connection = await joinVoiceChannel({
                            channelId: voiceChannel.id,
                            guildId: interaction.guild.id,
                            adapterCreator: interaction.guild.voiceAdapterCreator
                        })
                        queueContruct.connection = connection;
                        play(queue, interaction.guild, queueContruct.songs[0]);
                    } catch (err) {
                        console.log(err);
                        queue.delete(interaction.guild.id);
                        return interaction.channel.send(err);
                    }
                } else {
                    sQueue.songs.push(video);
                    return interaction.reply({ content: `⏯️ **${video.title}** has been added to the queue!` });
                }
            }
        });




    },
};
