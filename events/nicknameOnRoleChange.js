const { Events } = require('discord.js');
const fs = require('node:fs');
const guildId = process.env.GUILD_ID;
const client = require('../index.js');
const path = require('node:path');

//for now this function triggers when we update member, and the nickname will change for this member only
//TODO: execute onReady()
module.exports = {
  name: Events.GuildMemberUpdate,
  async execute(oldMember, newMember) {
    //guard clause to check for proper guildId. Is redundant i think
    if (newMember.guild.id !== guildId) return;

    //check if role cache has changed
    const rolesChanged = oldMember.roles.cache.size !== newMember.roles.cache.size;

    if (rolesChanged) {
      const highestRole = removeOldRank(getHighestRole(newMember.roles.cache));
      const normalizedNickname = removeOldRank(newMember.displayName);
      const newNickname = `${highestRole} | ${normalizedNickname}`;
      const truncatedNickname = truncateNickname(newNickname);

      if (truncateNickname(newNickname) !== truncatedNickname) console.log(`${newNickname} was too long. ${newMember.user.tag} nickname set to: ${truncateNickname}`);

      newMember.setNickname(truncatedNickname)
        .then(() => console.log(`Nickname updated for ${newMember.user.tag}: ${newNickname}`))
        .catch(console.error);
    }
  },
};

function truncateNickname(displayName){
  // 32 = maximum length
  if (displayName. length > 32) 
    return displayName.substring(0, 32).trim();
  return displayName;
}

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
  //IMPORTANT: New roles have to be added at the beginning of the array
  const roleStructure = ["Trainee Operator", "Recruit", "Cadet" ]; 

  const roleNames = roles.map(role => role.name);
  let highestRole = roleStructure.find(role => roleNames.includes(role));

  if (highestRole === "Trainee Operator"){
    highestRole = "[T] Operator"; //we have to change "Trainee Operator" to "[T] Operator" otherwise we need to do this shit
  }
  if(isInReserve(roles)){
    //[R][T] Operator looks cleaner for me
    highestRole = "[R]" + highestRole; //i know that we use [R-T] to indicate trainee in reserve, but i can't figure it out rn
  }

  return highestRole || null; 
}
