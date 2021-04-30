const {Discord, MessageEmbed, Message} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const Config = require("../Config.json")
const ayarlar = require("../ayarlar.json")

      
module.exports = {
  conf: {
    aliases: ["ban", "banla", "siktir", "boşyapıyor"],
    name: "Ban",
    help: "",
  }, 
  run: async (client, message, args, embed) => {

    let solve =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    let sebep = args[1]
    let yetkiceza = db.fetch(`yetkilibansayi_${message.author.id}`)
    let log = Config.penals.ban.log
    let yetkili = Config.penals.ban.staff

    const solveyok = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Kullanıcıyı etiketlemeniz gerekli!**`)
    .setFooter(`Solve?`)


    const yetkiyok = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Bu komutu kullanabilmen için [${yetkili}] rolüne ihtiyacın var!**`)
    .setFooter(`Solve?`)

    const sebepyok = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Sebep belirtilmemiş!**`)
    .setFooter(`Solve`)


    const okey = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`
    **İşlem Başarılı**
    **Banlanan kişi:** ${solve.username}
    **Banlayan yetkili:** ${message.author.id}
    **Banlanma sebebi:** ${sebep}
    ${message.author}'un toplam ban sayısı: ``${yetkiceza}```)
    .setFooter(`Solve`)

    if(!solve) return message.channel.send(solveyok)
    if(!message.member.roles.cache.get(yetkili)) return message.channel.send(yetkiyok)
    if(!sebep) return message.channel.send(sebepyok)



    message.guild.members.cache.get(solve.id).ban({reason: `${sebep}`})
    db.add(`yetkilibansayi_${message.author.id}`, 1)
    message.channel.send(okey)
    log.send(okey)
  }
}