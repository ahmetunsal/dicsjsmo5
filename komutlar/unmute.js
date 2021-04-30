const {Discord, MessageEmbed, Message} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const Config = require("../Config.json")
const ms = require("ms")
const ayarlar = require("../ayarlar.json")
      
module.exports = {
  conf: {
    aliases: ["um", "susturmakaldır", "kaldır"],
    name: "unmute",
    help: "",
  }, 
  run: async (client, message, args, embed) => {

    let susturulmuş = Config.penals.chatMute.roles
    let yetki = Config.penals.chatMute.staffs
    let mutesayisi = db.fetch(`mutesayı_${message.author.id}`)
      
    let solve = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    const sol = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Bir kişi etiketlemelisin!**`)
    .setFooter(`Solve?`)


    const yet = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Yeterli yetkiye sahip değilsin!**`)
    .setFooter(`Solve?`)

    const okey = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`
    **İşlem Tamam!**
    **Etiketlenen kişinin mute cezası kaldırıldı**
    `)



    if(!solve) return message.channel.send()
    if(!message.member.roles.cache.get(yetki)) return message.channel.send()

    let member = message.guild.member(solve);
    member.roles.remove(susturulmuş);
    message.channel.send(okey)
    




  }
}