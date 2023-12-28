const {  } = require("discord.js");
const cron = require("node-cron");
const { guildId } = require('../config.json');

module.exports = {
    update() {
        cron.schedule("* * * * *", function() {
        })
    },
}