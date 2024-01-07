const { Events } = require('discord.js');
const fs = require('node:fs');
const guildId = process.env.GUILD_ID;
const client = require('../index.js');
const path = require('node:path');

module.exports = {
  name: Events.GuildMemberUpdate,
  async execute(oldMember, newMember) {
    if (newMember.guild.id !== guildId) return;

    //check if role cache has changed
    const rolesChanged = oldMember.roles.cache.size !== newMember.roles.cache.size;

    //if role cache has changed
    if (rolesChanged) {
      const highestRole = getHighestRole(newMember.roles.cache);
      const nickname = removeOldRank(newMember.displayName);
      const newNickname = `${highestRole} | ${nickname}`;

      newMember.setNickname(newNickname)
        .then(() => console.log(`Nickname updated for ${newMember.user.tag}: ${newNickname}`))
        .catch(console.error);
    }
  },
};

function removeOldRank(displayName){
  const index = displayName.indexOf('|');
  
  if (index !== -1) {
    // If | is found, remove everything before it (including |)
    return displayName.substring(index + 1).trim();
  } 
    return displayName;

}

function getHighestRole(roles) {

  //TODO: fill more roles
  //TODO: it's in reverse order - change this
  const roleStructure = ["Cadet", "Recruit", "Trainee Operator"];

  const roleNames = roles.map(role => role.name);
  const highestRole = roleStructure.find(role => roleNames.includes(role));

  return highestRole || null; 
}
