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

function isInReserve(roles){
  const roleNames = roles.map(role => role.name);
  if (roleNames.includes("Active Reservist")){
    return true;
  }
  return false;
}

function getHighestRole(roles) {

  //TODO: fill more roles
  const roleStructure = ["Trainee Operator", "Recruit", "Cadet" ]; 

  const roleNames = roles.map(role => role.name);
  let highestRole = roleStructure.find(role => roleNames.includes(role));

  if (highestRole === "Trainee Operator"){
    highestRole = "[T] Operator"; //we have to change "Trainee Operator" to "[T] Operator" otherwise we need to do this shit
  }
  if(isInReserve(roles)){
    highestRole = "[R]" + highestRole; //i know that we use [R-T] to indicate trainee in reserve, but i can't figure it out rn
  }

  return highestRole || null; 
}
