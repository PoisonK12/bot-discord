const { Client, Intents } = require('discord.js');
const cron = require('node-cron');


const token = 'TOKEN';

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] 
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    cron.schedule('0 9 * * 1', async () => {

        const channel = client.channels.cache.get('1248679500049420297');
        if (channel) {
            const guild = channel.guild;
            const members = await guild.members.fetch();

            members.forEach(member => {
                if (!member.user.bot) { 
                    member.send(`Hola ${member.displayName},\n\n1. ¿Cuáles son tus tareas para esta semana?\n2. ¿Cuáles serán tus principales logros en los próximos días?\n3. ¿Qué vas a hacer hoy?\n4. ¿Hay algo que bloquee tu progreso?`);
                }
            });
        }
    }, {
        timezone: "Venezuela/Caracas"
    });
});

client.login(token);
