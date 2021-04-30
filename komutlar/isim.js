const {Discord, MessageEmbed, Message} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const Config = require("../Config.json")
const ayarlar = require("../ayarlar.json")

      
module.exports = {
  conf: {
    aliases: ["i", "isim", "değiş", "müq"],
    name: "İsim",
    help: "",
  }, 
  run: async (client, message, args, embed) => {

    let solve =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    let isim = args[1]
    let yas = args[2]
    let yrole = Config.StaffRole
    let kayitlog = Config.penals.kayıt.log


    const isi = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**İsim yazmayı unuttun!**`)
    .setFooter(`Solve`)

    const yasy = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Bir yaş girmelisiniz!**`)
    .setFooter(`Solve?`)

    const yro = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Yeterli yetkiniz bulunmamakta**`)
    .setFooter(`Solve`)

    const eti = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Bir kişi etiketlemedin!**`)
    .setFooter(`Solve?`)

    const oldu = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Kullanıcının ismini ``${isim} | ${yas}`` olarak değiştirdim!**`)
    .setFooter(`Solve?`)
    

    if(!solve) return message.channel.send(eti)
    if(!isim) return message.channel.send(isi)
    if(!yas) return message.channel.send(yasy)
    if(!message.member.roles.cache.get(yrole)) return message.channel.send(yro)



    message.channel.send(oldu)
    solve.setNickname(`${isim} | ${yas}`)
    kayitlog.send(oldu)


  }
}