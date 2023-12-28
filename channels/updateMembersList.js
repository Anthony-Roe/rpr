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
                                cadet.setName(`Cᴀᴅᴇᴛs${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // Recruit
                guild.roles.fetch(roles.recruit).then(
                    role => {
                        guild.channels.fetch(channels.recruit).then(
                            cadet => {
                                cadet.setName(`Rᴇᴄʀᴜɪᴛs${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // EchoWest
                guild.roles.fetch(roles.echowest).then(
                    role => {
                        guild.channels.fetch(channels.echowest).then(
                            cadet => {
                                cadet.setName(`EᴄʜᴏWᴇsᴛ${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // EchoEast
                guild.roles.fetch(roles.echoeast).then(
                    role => {
                        guild.channels.fetch(channels.echoeast).then(
                            cadet => {
                                cadet.setName(`EᴄʜᴏEᴀsᴛ${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // foxtrotwest
                guild.roles.fetch(roles.foxtrotwest).then(
                    role => {
                        guild.channels.fetch(channels.foxtrotwest).then(
                            cadet => {
                                cadet.setName(`FᴏxᴛʀᴏᴛWᴇsᴛ${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // foxtroteast
                guild.roles.fetch(roles.foxtroteast).then(
                    role => {
                        guild.channels.fetch(channels.foxtroteast).then(
                            cadet => {
                                cadet.setName(`FᴏxᴛʀᴏᴛEᴀsᴛ${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // golfeast
                guild.roles.fetch(roles.foxtroteast).then(
                    role => {
                        guild.channels.fetch(channels.foxtroteast).then(
                            cadet => {
                                cadet.setName(`FᴏxᴛʀᴏᴛEᴀsᴛ${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // golfwest
                guild.roles.fetch(roles.foxtroteast).then(
                    role => {
                        guild.channels.fetch(channels.foxtroteast).then(
                            cadet => {
                                cadet.setName(`FᴏxᴛʀᴏᴛEᴀsᴛ${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
                // reaper
                guild.roles.fetch(roles.reaper).then(
                    role => {
                        guild.channels.fetch(channels.reaper).then(
                            cadet => {
                                cadet.setName(`𝗥𝗲𝗮𝗽𝗲𝗿𝘀${chars.colon}${chars.space}${role.members.size}`)
                            }
                        )
                    }
                )
            }
        );
    });
}