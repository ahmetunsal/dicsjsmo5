const {Discord, MessageEmbed, Message, MessageAttachment} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const ms = require("ms")
const Config = require("../Config.json")
      
module.exports = {
  conf: {
    aliases: ["unsesmute", "unsesm", "um", "sesunmute"],
    name: "unsmute",
    help: "",
  }, 
run: async (client ,message, args) => {

    let yetki = Config.penals.voiceMute.staffs;
    let rol = Config.penals.voiceMute.roles;
    let solve = member.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let vmzaman = args[1];
    let sebep = args.slice(2,args.length).join(" ");
    let ytceza = db.fetch(`ytatilanvmute_${message.author.id}`)
    let mutelog = Config.penals.voiceMute.log
    let vmuyari = db.fetch(`vmuyari_${solve.id}`)

    const hata1 = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Bir kişi etiketlemelisin!**`)
    .setFooter(`Solve?`)
    .setColor("RED")

    const hata2 = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`**Yeterli yetkiniz bulunmamakta!**`)
    .setFooter(`Solve?`)
    .setColor("RED")

    const ok = new MessageEmbed()
    .setAuthor(message.author.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`
    **Tamamdır**
    **Etiketlediğin kişinin** ${solve} **mute cezasını kaldırdım!**
    ${solve}**'nin toplam cezası** ``${vmuyari}```)
    .setFooter(`Solve?`)

    const cezabitti = new MessageEmbed()
    .setAuthor(message.author.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`${solve}'nin cezası ${message.author} tarafından kaldırıldı`)
    .setFooter(`${solve}'nin toplam cezası: ${vmuyari}`)



    if(!solve) return message.channel.send(hata1);
    if(!message.member.roles.cache.has(yetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(hata2);

    solve.voice.setMute(false, sebep)
    message.channel.send(cezabitti)
    




}
}