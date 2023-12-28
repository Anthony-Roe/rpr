/*
const { Events, AuditLogOptionsType, AuditLogEvent } = require('discord.js');

module.exports = {
	name: Events.GuildAuditLogEntryCreate,
	async execute(auditLog) {
		const { action, changes, extra: channel, executorId, targetId } = auditLog;
        console.log(action);
        switch(action) {
            case AuditLogEvent.GuildUpdate:
                // Ensure the executor is cached.
                var executor = await client.users.fetch(executorId);
                console.log(`${executor.tag} made changes to the server ${JSON.stringify(changes)} testing ${}`);
                return;
            case AuditLogEvent.MemberRoleUpdate:
                // Ensure the executor is cached.
                var executor = await client.users.fetch(executorId);

                // Ensure the author whose message was deleted is cached.
                var target = await client.users.fetch(targetId);
                console.log(`${executor.tag} updated ${target.tag} roles`);
                return;
            default:
                return;
        };
	},
};
*/