const fs = require("fs");
const { Client, Collection, MessageEmbed } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');

const client = new Client();
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
console.log(client.commands);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("nightcore on top!", { type: "PLAYING" })
});

client.on("guildMemberAdd", function(member){

  client.on('message', message =>"message")
});

client.on("guildCreate", guild => {
  
	client.on('message', message =>{

		const args = message.content.slice(PREFIX.length).split(/ +/);
		client.commands.get('dm').execute(client, message, args);

	})
});

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    client.commands.get(command).execute(client, message, args);
});

client.login(TOKEN);
