const {  } = require("discord.js");
const cron = require("node-cron");
const { channels, guildId, roles, chars } = require('../config.json');
const client = require('../index.js');

module.exports = {
    start() {
        UpdateChannel();
    },
}

function UpdateChannel()
{
    cron.schedule("* * * * *", () => {
        console.log("Updating Stats")
        client.guilds.fetch(guildId).then(
            guild => {
                // Cadet
                guild.roles.fetch(roles.cadet).then(
                    role => {
                        guild.channels.fetch(channels.cadet).then(
                            cadet => {
                                cadet.setName(`𝗖𝗮𝗱𝗲𝘁𝘀${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // Recruit
                guild.roles.fetch(roles.recruit).then(
                    role => {
                        guild.channels.fetch(channels.recruit).then(
                            cadet => {
                                cadet.setName(`𝗥𝗲𝗰𝗿𝘂𝗶𝘁𝘀${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // EchoWest
                guild.roles.fetch(roles.echowest).then(
                    role => {
                        guild.channels.fetch(channels.echowest).then(
                            cadet => {
                                cadet.setName(`𝗘𝗰𝗵𝗼𝗪𝗲𝘀𝘁${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // EchoEast
                guild.roles.fetch(roles.echoeast).then(
                    role => {
                        guild.channels.fetch(channels.echoeast).then(
                            cadet => {
                                cadet.setName(`𝗘𝗰𝗵𝗼𝗘𝗮𝘀𝘁${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // foxtrotwest
                guild.roles.fetch(roles.foxtrotwest).then(
                    role => {
                        guild.channels.fetch(channels.foxtrotwest).then(
                            cadet => {
                                cadet.setName(`𝗙𝗼𝘅𝘁𝗿𝗼𝘁𝗪𝗲𝘀𝘁${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // foxtroteast
                guild.roles.fetch(roles.foxtroteast).then(
                    role => {
                        guild.channels.fetch(channels.foxtroteast).then(
                            cadet => {
                                cadet.setName(`𝗙𝗼𝘅𝘁𝗿𝗼𝘁𝗘𝗮𝘀𝘁${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // golfeast
                guild.roles.fetch(roles.golfeast).then(
                    role => {
                        guild.channels.fetch(channels.golfeast).then(
                            cadet => {
                                cadet.setName(`𝗚𝗼𝗹𝗳𝗘𝗮𝘀𝘁${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // golfwest
                guild.roles.fetch(roles.golfwest).then(
                    role => {
                        guild.channels.fetch(channels.golfwest).then(
                            cadet => {
                                cadet.setName(`𝗚𝗼𝗹𝗳𝗪𝗲𝘀𝘁${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // reaper
                guild.roles.fetch(roles.reaper).then(
                    role => {
                        guild.channels.fetch(channels.reaper).then(
                            cadet => {
                                cadet.setName(`𝐑𝐞𝐚𝐩𝐞𝐫𝐬${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
            }
        );
    });
}