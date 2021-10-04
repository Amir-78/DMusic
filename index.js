const Discord = require('discord.js');
const fs = require("fs");
const axios = require("axios").default;
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING
    ]
})

const config = require('./config.json');
const queue = new Map();

client.once("ready", async() => {
    let version = await (await axios.get("https://raw.githubusercontent.com/Amir-78/DMusic/main/version.json")).data
    console.log("\x1b[32m ______     ____    ____                      _           \n|_   _ `.  |_   \\  /   _|                    (_)          \n  | | `. \\   |   \\/   |    __   _    .--.    __    .---.  \n  | |  | |   | |\\  /| |   [  | | |  ( (`\\]  [  |  / /'`\\] \n _| |_.' /  _| |_\\/_| |_   | \\_/ |,  `'.'.   | |  | \\__.  \n|______.'  |_____||_____|  '.__.'_/ [\\__) ) [___] '.___.' \n\n                  \x1b[5m\x1b[31m[Github: github.com/Amir-78]\x1b[0m")
    console.log(`\n\n    \x1b[36m+ Bot : \x1b[32m${client.user.tag}\n\n    \x1b[36m+ Status : \x1b[32mConnected\n\n    \x1b[36m+ Prefix : \x1b[32m${config.BOT_PREFIX}\x1b[0m\n\n    \x1b[36m+ Activity : \x1b[32mListening to ${config.BOT_LISTENING_TITLE}\x1b[0m`)
    if(version.version != config.CODE_VERSION){
        console.log("\n    \x1b[31m[There is new version please check: https://github.com/Amir-78/DMusic]\x1b[0m")
    }
    client.user.setActivity({ type: 'LISTENING', name: config.BOT_LISTENING_TITLE })
})

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const commandH = require(`./commands/${file}`);
    client.commands.set(commandH.name, commandH);
}

client.on('messageCreate', message => {
    if (!message.content.startsWith(config.BOT_PREFIX) || message.author.bot || message.author.system) return;
    const cm = message.content.slice(config.BOT_PREFIX.length).trim().split(/ +/g);
    const command = cm.shift().toLowerCase();
    if (command == "lyrics" || command == "l") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('lyrics').execute(message, config, serverQueue, queue);

    } else if (command == "np") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('np').execute(message, config, serverQueue, queue);

    } else if (command == "pause") {

        let serverQueue = queue.get(message.guild.id);

        client.commands.get('pause').execute(message, config, serverQueue, queue);

    } else if (command == "play" || command == "p") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('play').execute(message, config, serverQueue, queue);

    } else if (command == "skip" || command == "s" || command == "fs") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('skip').execute(message, config, serverQueue, queue);

    } else if (command == "stop" || command == "leave") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('stop').execute(message, config, serverQueue, queue);

    } else if (command == "queue" || command == "q") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('queue').execute(message, config, serverQueue, queue);

    } else if (command == "loop" || command == "repeat") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('loop').execute(message, config, serverQueue, queue);

    } else if (command == "search" || command == "find") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('search').execute(client, message, config, serverQueue, queue);

    } else if (command == "clear" || command == "clean") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('clear').execute(message, config, serverQueue, queue);

    } else if (command == "remove") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('remove').execute(message, config, serverQueue, queue);

    } else if (command == "move") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('move').execute(message, config, serverQueue, queue);

    } else if (command == "resume") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('resume').execute(message, config, serverQueue, queue);

    } else if (command == "volume" || command == "vol") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('vol').execute(message, config, serverQueue, queue);
    } else if (command == "help" || command == "commands" || command == "bot") {
        client.commands.get('help').execute(message, config);
    } else if (command == "replay") {
        let serverQueue = queue.get(message.guild.id);

        client.commands.get('replay').execute(message, config, serverQueue, queue);
    }
})

client.login(config.BOT_TOKEN)