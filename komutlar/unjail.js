const {Discord, MessageEmbed, Message} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const Config = require("../Config.json")
const ms = require("ms")
const ayarlar = require("../ayarlar.json")
      
module.exports = {
  conf: {
    aliases: ["uj", "jailkaldır", "cezakaldır"],
    name: "unjail",
    help: "",
  }, 
  run: async (client, message, args, embed) => {

    let jailrol = Config.penals.jail.roles
    let yetki = Config.penals.jail.staffs
      
    let solve = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let jailsayisi = db.fetch(`jailsayı_${solve.id}`)
    let cezalandirma = db.fetch(`ytcezalarndırma_${message.author.id}`)




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
    **Etiketlenen kişinin jail cezası kaldırıldı**
    ${solve}'nin toplam jail sayısı ${jailsayisi}
    `)



    if(!solve) return message.channel.send()
    if(!message.member.roles.cache.get(yetki)) return message.channel.send()

    let member = message.guild.member(solve);
    member.roles.remove(jailrol);
    message.channel.send(okey)

    




  }
}