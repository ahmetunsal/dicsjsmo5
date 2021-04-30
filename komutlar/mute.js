const {Discord, MessageEmbed} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const Config = require("../Config.json")
const ms = require("ms")
const ayarlar = require("../ayarlar.json")
      
module.exports = {
  conf: {
    aliases: ["m", "sustur", "s", "su"],
    name: "mute",
    help: "",
  }, 
  run: async (client, message, args, embed) => {

    let mutelikisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    let muterol = Config.penals.chatMute.roles
    let muteyetkili = Config.penals.chatMute.staffs
    let zaman = args[1]
    let sebep = args.splice(2, args.length).join(" ");
    let mutekanal = Config.penals.chatMute.log
    let muteceza = db.fetch(`mutelendin_${mutelikisi}`)


    const mutelikisiyok = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Bir kişi etiketlemelisin**`)
    .setFooter(`Solve`)

    const muteyetkisiyok = new MessageEmbed()
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
    Etiketlediğin kişiye [${mutelikisi}} mute rolünü verdim!`)
    .setFooter(`${mutelikisi}'nin toplam cezası: ${muteceza}`)

    const cezabitti = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`${mutelikisi}'nin cezası bitti`)


    if(!mutelikisi) return message.channel.send(mutelikisiyok)
    if(!message.member.roles.cache.get(muteyetkili)) return message.channel.send(muteyetkisiyok)
    if(!zaman) return message.channel.send(zamanyok)
    if(!sebep) return message.channel.send(sebepyok)



    await mutelikisi.roles.add(muterol)
    db.add(`mutelendin_${mutelikisi}`, 1)

    message.channel.send(islemokey)

    setTimeout(function() {
      mutekisi.roles.remove(muterol);
      message.channel.send(new MessageEmbed().setColor('#bae800').setDescription(`<@${mutelikisi.id}> kullanıcısının mutelenme süresi sona erdi!`)
    ); ms(zaman);
})
}
}