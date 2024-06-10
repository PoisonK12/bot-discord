const { Client, Intents } = require('discord.js');
const cron = require('node-cron');

const token = 'TOKEN';

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] 
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    cron.schedule('0 10 * * 6', async () => {
        const channel = client.channels.cache.get('CANAL');
        if (channel) {
            const guild = channel.guild;
            const members = await guild.members.fetch();

            members.forEach(member => {
                if (!member.user.bot) { 
                    member.send("¿Estás trabajando hoy (sábado)? Responde sí o no.");
                }
            });
        }
    }, {
        timezone: "Venezuela/Caracas"
    });

    cron.schedule('0 18 * * 6', async () => {
        const channel = client.channels.cache.get('CANAL'); 
        if (channel) {
            const guild = channel.guild;
            const members = await guild.members.fetch();

            members.forEach(member => {
                if (!member.user.bot) { 
                    member.send("¿Qué has hecho hoy (sábado)?");
                }
            });
        }
    }, {
        timezone: "Venezuela/Caracas"
    });
});

client.login(token);
