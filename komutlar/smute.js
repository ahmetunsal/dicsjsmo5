const {Discord, MessageEmbed, Message} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const ms = require("ms")
const Config = require("../Config.json")
      
module.exports = {
  conf: {
    aliases: ["sesmute", "sesm",],
    name: "smute",
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

    const hata3 = new MessageEmbed()
    .setAuthor(message.author.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`**Geçerli bir zaman girmelisiniz!**`)
    .setFooter(`Solve?`)
    .setColor("RED")

    const hata4 = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`**Geçerli bir sebep girlmelisiniz!**`)
    .setFooter(`Solve?`)
    .setColor("RED")


    const ok = new MessageEmbed()
    .setAuthor(message.author.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`
    **İşlem tamamlandı!**
    **Cezalandıran yetkili :** ${message.author}
    **Cezalandırılan kişi :** ${solve}
    **Ceza Süresi :** ${vmzaman}
    ${message.author} **toplam** ${ytceza} **kere mute atmış.**`)
    .setFooter(`Solve?`)

    const cezabitti = new MessageEmbed()
    .setAuthor(message.author.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`${solve}'nin cezası bitti`)
    .setFooter(`${solve}'nin toplam cezası: ${vmuyari}`)





    if(!solve) return message.channel.send(hata1);
    if (message.member.roles.highest.position <= solve.roles.highest.position) return message.channel.send(new MessageEmbed().setColor('RED').setDescription(`**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**`)).then(x => x.delete({timeout: 5000}));
    if(!message.member.roles.cache.has(yetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(hata2);
    if(!vmzaman || !ms(vmzaman)) return message.channel.send(hata3);
    ms(vmzaman);
    if(!sebep) return message.channel.send(hata4);

    message.channel.send(ok)
    await solve.voice.setMute(true, sebep);
    client.channels.cache.get(mutelog).send(ok)

    db.add(`ytatilanvmute_${message.author.id}`, 1)
    db.add(`vmuyari_${solve.id}`, 1)

    setTimeout(function(){
      solve.voice.setMute(false, sebep)
      message.channel.send(cezabitti)
    })
    
}
}
