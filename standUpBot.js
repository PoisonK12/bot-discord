const { Client, Intents } = require('discord.js');
const cron = require('node-cron');

const token = 'TOKEN';

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] 
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);


    cron.schedule('50 14 * * *', async () => {
        const channel = client.channels.cache.get('CANAL'); 
        if (channel) {
            channel.send("¡El Stand Up comenzará en 10 minutos!");
        }
    }, {
        timezone: "Venezuela/Caracas"
    });

    cron.schedule('0 17 * * *', async () => {
        const channel = client.channels.cache.get('CANAL'); 
        if (channel) {
            const guild = channel.guild;
            const members = await guild.members.fetch();

            members.forEach(member => {
                if (!member.user.bot) { 
                    member.send("Recuerda enviar la minuta de la reunión.");
                }
            });
        }
    }, {
        timezone: "Venezuela/Caracas"
    });
});

client.login(token);
