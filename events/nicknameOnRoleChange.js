const { Events } = require('discord.js');
const guildId = process.env.GUILD_ID;

module.exports = {
  name: Events.GuildMemberUpdate,
  async execute(oldMember, newMember) {
    if (newMember.guild.id !== guildId) return;

    const rolesChanged = !oldMember.roles.cache.equals(newMember.roles.cache);

    if (rolesChanged) {
      const { displayName } = newMember;
      const roleNames = new Set(newMember.roles.cache.map(role => role.name));
      const highestRole = getHighestRole(roleNames);
    
      const newNickname = truncateNickname(`${highestRole} | ${removeOldRank(displayName)}`);
      
    
      try {
        await newMember.setNickname(newNickname);
        console.log(`Nickname updated for ${newMember.user.tag}: ${newNickname}`);
      } catch (error) {
        console.error('Error updating nickname:', error);
      }
    }    
  },
};

function truncateNickname(displayName) {
  // 32 = maximum length
  return displayName.length > 32 ? displayName.substring(0, 32).trim() : displayName;
}

function removeOldRank(displayName) {
  const index = displayName.indexOf('|');
  return index !== -1 ? displayName.substring(index + 1).trim() : displayName;
}

function isInReserve(roles) {
  return roles.has("Active Reservist");
}

function getHighestRole(roleNames) {
  const roleStructure = ["Operator", "Trainee Operator", "Recruit", "Cadet"];
  
  const isTraineeOperator = roleNames.has("Trainee Operator");
  const isReservist = roleNames.has("Active Reservist");

  if (isTraineeOperator && isReservist) {
    return "[R-T] Operator";
  }

  for (const role of roleStructure) {
    if (roleNames.has(role)) {
      // If the role is trainee operator return [T] operator, otherwise if reservist return [R] + role, otherwise return role.
      return role === "Trainee Operator" ? "[T] Operator" : isReservist ? "[R] " + role : role;
    }
  }
  return null;
}
