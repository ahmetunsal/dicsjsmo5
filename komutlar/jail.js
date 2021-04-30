const {Discord, MessageEmbed} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const Config = require("../Config.json")
const ms = require("ms")
const ayarlar = require("../ayarlar.json")
      
module.exports = {
  conf: {
    aliases: ["ceza", "cezaandır",],
    name: "jail",
    help: "",
  }, 
  run: async (client, message, args, embed) => {

    let jaillikisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    let jailrol = Config.penals.jail.roles
    let jailyetkili = Config.penals.jail.staffs
    let zaman = args[1]
    let sebep = args.splice(2, args.length).join(" ");
    let jailkanal = Config.penals.jail.log
    let jailsayisi = db.fetch(`jailsayı_${jaillikisi.id}`)
    let cezalandirma = db.fetch(`ytcezalarndırma_${message.author.id}`)



    const jaillikisiyok = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Bir kişi etiketlemelisin**`)
    .setFooter(`Solve`)

    const jailyetkisiyok = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Yetkin yok bruh**`)
    .setFooter(`Solve Ab`)

    const zamanyok = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Sevgili kardeşim zaman algını mı kaybettin zamanı yazmıyorsun!**`)
    .setFooter(`Solve`)

    const sebepyok = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Sebep belirtmedin ama**`)
    .setFooter(`Solve the boçtu olmayan`)

    const islemokey = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**İşlem tamam bruh!**
    Etiketlediğin kişiye [${jaillikisi}} jail rolünü verdim!`)
    .setFooter(`${jaillikisi}'nin toplam cezası: ${jailceza}`)

    const cezabitti = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`${jaillikisi}'nin cezası bitti`)


    if(!jaillikisi) return message.channel.send(jaillikisiyok)
    if(!message.member.roles.cache.get(jailyetkili)) return message.channel.send(jailyetkisiyok)
    if(!zaman) return message.channel.send(zamanyok)
    if(!sebep) return message.channel.send(sebepyok)



    await jaillikisi.roles.add(jailrol)
    db.add(`jailsayı_${jaillikisi}`, 1)
    db.add(`ytcezalarndırma_${message.author.id}`, 1)
    

    message.channel.send(islemokey)

    setTimeout(function() {
      jailkisi.roles.remove(jailrol);
      message.channel.send(new MessageEmbed().setColor('#bae800').setDescription(`<@${jaillikisi.id}> kullanıcısının jaillenme süresi sona erdi!`)
    ); ms(zaman);
})
}
}