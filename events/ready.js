const { Client, Events } = require('discord.js');
const fs = require('node:fs');
const { guildId } = require('../config.json');
const client = require('../index.js')
const path = require('node:path');
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute() {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const channelsPath = path.join(client.projectDir, 'channels');
		const channelsFiles = fs.readdirSync(channelsPath).filter(file => file.endsWith('.js'));
		for (const file of channelsFiles) {
			const filePath = path.join(channelsPath, file);
			const run = require(filePath);
			if (run.start) {
				run.start();
			}
		}
	},
};
