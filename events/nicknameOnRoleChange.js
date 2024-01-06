const { Events } = require('discord.js');
const fs = require('node:fs');
const { guildId } = require('../config.json');
const client = require('../index.js');
const path = require('node:path');

module.exports = {
  name: Events.GuildMemberUpdate,
  execute(oldMember, newMember) {
    if (newMember.guild.id !== guildId) return;

    const rolesChanged = oldMember.roles.cache.size !== newMember.roles.cache.size;

    if (rolesChanged) {
      const highestRole = getHighestRole(newMember.roles.cache);
      const newNickname = `${highestRole} | ${newMember.displayName}`;

      newMember.setNickname(newNickname)
        .then(() => console.log(`Nickname updated for ${newMember.user.tag}: ${newNickname}`))
        .catch(console.error);
    }
  },
};

function getHighestRole(roles) {
  const roleStructure = [
    "Cadet", 
    "Recruit"
    ];
  return roleStructure.first().name;
}
