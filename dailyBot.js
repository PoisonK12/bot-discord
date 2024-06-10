const { Client, Intents } = require('discord.js');
const cron = require('node-cron');

const token = 'TOKEN';

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] 
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    cron.schedule('0 9 * * 2-5', async () => {
        const channel = client.channels.cache.get('CANAL');
        if (channel) {
            const guild = channel.guild;
            const members = await guild.members.fetch();

            members.forEach(member => {
                if (!member.user.bot) { 
                    member.send(`Hola ${member.displayName},\n\n¿Qué tareas estarás realizando el día de hoy?\n¿Existe algo que puede ayudarte a completarlas de forma más eficiente?\n¿Qué puedo hacer por ti?`);
                }
            });
        }
    }, {
        timezone: "Venezuela/Caracas"
    });

    cron.schedule('0 17 * * 2-5', async () => {
        const channel = client.channels.cache.get('ID_DEL_CANAL');
        if (channel) {
            const guild = channel.guild;
            const members = await guild.members.fetch();

            members.forEach(member => {
                if (!member.user.bot) { 
                    member.send(`Hola ${member.displayName},\n\n¿Qué tal estuvo tu día en el trabajo?\n¿De tus tareas que mencionaste en la mañana, cuáles pudiste completar?\nDe haber una tarea que no completaste, ¿qué tarea fue y qué evitó que pudieras completarla?\n¿Existe algo que te moleste o te esté bloqueando de alguna forma?`);
                }
            });
        }
    }, {
        timezone: "Venezuela/Caracas"
    });
});

client.login(token);
