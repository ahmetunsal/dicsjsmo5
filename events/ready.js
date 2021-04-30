  
const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../ayarlar.json')

module.exports = client => {
    client.user.setPresence({activity: {name: "Solve Bey?", type: "LISTENING"}, status: "idle"}); //dnd, idle, online, offline
  
}