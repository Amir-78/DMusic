const Discord = require("discord.js");
module.exports = {
    name: "queue",
    description: "Queue!",
    async execute(message, config, sQueue) {
        if (message.guild.me.voice.channel && (message.member.voice.channelId != message.guild.me.voice.channelId)) return message.reply({content: `:x: - You must be listening in **${message.guild.me.voice.channel.name}** to use that!`});
        if (message.member.voice.deaf || message.member.voice.selfDeaf) return message.reply({content: `**:x: - You cannot run this command while deafened!**`});
        if (message.guild.me.voice.mute) return message.reply({content: `**:x: - Unmute me to use this command!**`});
        if (sQueue && sQueue.songs && sQueue.songs.length != 0) {
            let max = 10;
            let pageNow = 0;
            var result = sQueue.songs.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / max)

                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = []
                }

                resultArray[chunkIndex].push(item)

                return resultArray
            }, [])
            let embed = new Discord.MessageEmbed()
                .setTitle(message.guild.name + " Queue!")
                .setThumbnail(message.guild.iconURL())
            for (var i = 0; i < result[pageNow].length; i++) {
                let time = "`" + `${result[pageNow][i].duration_h}:${result[pageNow][i].duration_m}:${result[pageNow][i].duration_s}` + "`"
                if (result[pageNow][i].duration_m.length == 1) {
                    result[pageNow][i].duration_m = "0" + result[pageNow][i].duration_m
                }
                if (result[pageNow][i].duration_s.length == 1) {
                    result[pageNow][i].duration_s = "0" + result[pageNow][i].duration_s
                }
                if (result[pageNow][i].duration_h.length == 1) {
                    result[pageNow][i].duration_h = "0" + result[pageNow][i].duration_h
                }
                if (result[pageNow][i].duration_h == 0) {
                    time = `${result[pageNow][i].duration_m}:${result[pageNow][i].duration_s}`
                }
                if(result[pageNow][i].duration_m == 0 && result[pageNow][i].duration_s == 0){
                    time = "";
                }
                if (i == 0) {
                    embed.addField(`**Now playing ⏯️ - ${result[pageNow][i].title}** - ${time}`, `\`Added by: ${result[pageNow][i].add_by}\``)
                } else {
                    embed.addField(`**#${sQueue.songs.indexOf(result[pageNow][i])} - ${result[pageNow][i].title}**- ${time}`, `\`Added by: ${result[pageNow][i].add_by}\``)
                }

            }
            embed.setFooter({text: `${message.member.user.tag} - Page: ${pageNow + 1}/${result.length} - Github: github.com/Amir-78`, iconURL: message.member.displayAvatarURL({dynamic: true})})
            message.reply({ embeds: [embed] }).then(async m => {
                const filter = (reaction, user) => {
                    return (reaction.emoji.name === '⬇️' || reaction.emoji.name === '⬆️' || reaction.emoji.name === '⏹️') && user.id === message.author.id;
                };

                await m.react("⬆️");
                await m.react("⏹️");
                await m.react("⬇️");

                const collector = m.createReactionCollector({ filter, time: 15000 });

                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji.name == "⬇️") {
                        pageNow += 1
                        if (pageNow == result.length) pageNow = (result.length);
                        let nextEmbed = new Discord.MessageEmbed()
                        .setTitle(message.guild.name + " Queue!")
                        .setThumbnail(message.guild.iconURL())
                        for (var i = 0; i < result[pageNow].length; i++) {
                            let time = "`" + `${result[pageNow][i].duration_h}:${result[pageNow][i].duration_m}:${result[pageNow][i].duration_s}` + "`"
                            if (result[pageNow][i].duration_m.length == 1) {
                                result[pageNow][i].duration_m = "0" + result[pageNow][i].duration_m
                            }
                            if (result[pageNow][i].duration_s.length == 1) {
                                result[pageNow][i].duration_s = "0" + result[pageNow][i].duration_s
                            }
                            if (result[pageNow][i].duration_h.length == 1) {
                                result[pageNow][i].duration_h = "0" + result[pageNow][i].duration_h
                            }
                            if (result[pageNow][i].duration_h == 0) {
                                time = `${result[pageNow][i].duration_m}:${result[pageNow][i].duration_s}`
                            }
                            if(result[pageNow][i].duration_m == 0 && result[pageNow][i].duration_s == 0){
                                time = "";
                            }
                            nextEmbed.addField(`**#${sQueue.songs.indexOf(result[pageNow][i])} - ${result[pageNow][i].title}**- ${time}`, `\`Added by: ${result[pageNow][i].add_by}\``)
                        }
                        nextEmbed.setFooter({text: `${message.member.user.tag} - Page: ${pageNow + 1}/${result.length}`, iconURL: message.member.displayAvatarURL({dynamic: true})})
                        m.edit({ embeds: [nextEmbed] })
                        reaction.users.remove(message.member.user)
                    }
                    if (reaction.emoji.name == "⬆️") {
                        pageNow -= 1
                        if (pageNow < 0) pageNow = 0;
                        let nextEmbed = new Discord.MessageEmbed()
                        .setTitle(message.guild.name + " Queue!")
                        .setThumbnail(message.guild.iconURL())
                        for (var i = 0; i < result[pageNow].length; i++) {
                            let time = "`" + `${result[pageNow][i].duration_h}:${result[pageNow][i].duration_m}:${result[pageNow][i].duration_s}` + "`"
                            if (result[pageNow][i].duration_m.length == 1) {
                                result[pageNow][i].duration_m = "0" + result[pageNow][i].duration_m
                            }
                            if (result[pageNow][i].duration_s.length == 1) {
                                result[pageNow][i].duration_s = "0" + result[pageNow][i].duration_s
                            }
                            if (result[pageNow][i].duration_h.length == 1) {
                                result[pageNow][i].duration_h = "0" + result[pageNow][i].duration_h
                            }
                            if (result[pageNow][i].duration_h == 0) {
                                time = `${result[pageNow][i].duration_m}:${result[pageNow][i].duration_s}`
                            }
                            if(result[pageNow][i].duration_m == 0 && result[pageNow][i].duration_s == 0){
                                time = "";
                            }
                            nextEmbed.addField(`**#${sQueue.songs.indexOf(result[pageNow][i])} - ${result[pageNow][i].title}**- ${time}`, `\`Added by: ${result[pageNow][i].add_by}\``)
                        }
                        nextEmbed.setFooter({text: `${message.member.user.tag} - Page: ${pageNow + 1}/${result.length}`, iconURL: message.member.displayAvatarURL({dynamic: true})})
                        m.edit({ embeds: [nextEmbed] })
                        reaction.users.remove(message.member.user)
                    }
                    if (reaction.emoji.name == "⏹️") {
                        collector.stop();
                        m.reactions.removeAll();
                        m.delete();
                        message.delete();
                    }
                });


            })
        } else {
            message.reply({content: ":x: | Queue are empty!"})
        }
    },
};
