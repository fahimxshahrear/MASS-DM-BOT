const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'dm',
    description: 'DM.',
    execute(client, message, args) {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function dm(messageContent) {
            var dmGuild = message.guild;
            var memberArray = dmGuild.members.cache.array();
            var memberCount = memberArray.length;
            var botCount = 0;
            var successCount = 0;

            console.log(`[+] Now sending a message to all ${memberCount} members of ${dmGuild.name}.\n\n`);

            for (var i = 0; i < memberCount; i++) {
                var member = memberArray[i];
                if (member.user.bot) {
                    console.log(`[-] Skipping bot with name ${member.user.username}.\n\n`);
                    botCount++;
                    continue;
                }

                var timeout = Math.floor((Math.random() * (1 - 0.01)) * 1) + 10;
                await sleep(timeout);

                if (i == (memberCount - 1)) {
                    console.log(`[*] Waited ${timeout}ms.\t\\/\tNow DMing ${member.user.username}.\n`);
                } else {
                    console.log(`[*] Waited ${timeout}ms.\t|${i + 1}|\tDMing ${member.user.username}.`);
                }

                try {
                    await member.send(messageContent);
                    successCount++;
                } catch (error) {
                    console.log(`Failed to send DM to ${member.user.username}: ${error.message}`);
                }
            }
            console.log(`Successfully sent ${successCount} messages. ${botCount} bots were skipped.`);
        }

        // Check if a message was provided
        if (args.length < 1) {
            return message.channel.send('Please provide a message to send. Usage: `!dm <message>`');
        }

        // Join all the arguments into a single message content
        const messageContent = args.join(' ');

        // Call the dm function with the message content
        dm(messageContent);
    }
};