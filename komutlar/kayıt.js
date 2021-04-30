const {Discord, MessageEmbed} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const Config = require("../Config.json")
      
module.exports = {
  conf: {
    aliases: ["e", "k", "erkek", "kız"],
    name: "Kayıt",
    help: "",
  }, 
  run: async (client, message, args, embed) => {
  
  const solve = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  const isim = args[1]
  const yas = args[2]
  const toplamkayit = db.fetch(`yetkilitk_${message.author.id}`)
  const yetki = Config.StaffRole
  
  
  const solveh = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setDescription(`**Bir kişi etiketlemeyi unuttunuz!**`)
  .setFooter(`Noisy`)
  
  const isimh = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setDescription(`**Bir isim girmelisiniz!**`)
  .setFooter(`Solve?`)
  
  const yash = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setDescription(`**Bir yaş girmelisiniz!**`)
  .setFooter(`Noisy?`)
  
  const yrolh = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setDescription(`**Etiketlediğiniz kişi sizden üstün veya sizinle aynı yetkide!**`)
  .setFooter(`Noisy?`)

  const yetkiyok = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`**Yeterli yetkiniz yok**`)
  .setFooter(`Solve`)

  const ztnkyt = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setDescription(`**Bu kişi zaten kayıtlı, kayıt olan bir kişi tekrar kayıt edilemez!**`)
  .setFooter(`Noisy?`)
  
  const mesaj = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setDescription(`**Kullanıcının ismi başarıyla** \"ム ${isim} • ${yas}\" **olarak değiştirildi.**`)
  .setTimestamp()
  .setColor("BLUE")
  .setFooter(`Solve?`)
  
  const editmsg = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setDescription(`
  **Kullanıcının ismi başarıyla** \"ム ${isim} • ${yas}\" **olarak değiştirildi.** <@&831133779296125050>
  `)
  .setTimestamp()
  .setColor("GREEN")
  .setFooter(`Noisy?`)
  
    const editmsgk = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setDescription(`
  **Kullanıcının ismi başarıyla** \"ム ${isim} • ${yas}\" **olarak değiştirildi.** <@&831133778968969216>
  `)
  .setTimestamp()
  .setColor("GREEN")
  .setFooter(`Solve?`)

  const kim = new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({}))
  .setDescription(`Pardon? Kimle bulaştığınızı bilmiyorsunuz efenim. Sahibimi kayıt edemezsin okey?`)
  .setFooter(`Noisy Hanım?`)
  

  
  if(!solve) return message.channel.send(solveh);
  if(!yas) return message.channel.send(yash)
  if(!message.member.roles.cache.get(yetki)) return message.channel.send(yetkiyok)
  if(!isim) return message.channel.send(isimh);
  
  if (db.get(`kayıt_${solve.id}`)) return message.channel.send(ztnkyt)
  const msg = await message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`Kullanıcının ismi \"ム ${isim} • ${yas}\" olarak değiştirildi`).setColor('#2e3033').setTimestamp().setThumbnail(message.author.avatarURL).setFooter(`Emoji ile cinsiyeti belirtiniz!`))
  let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
  message.guild.members.cache.get(solve.id).setNickname(`ム ${isim} • ${yas}  `).catch();
  await msg.react('832544291837968414') // erkek emojileri soldaki gibi giriniz
  await msg.react('832544293611634689') //kız

  collector.on("collect", async(reaction, user) => {
      await msg.reactions.removeAll()
      if (reaction.emoji.id == '832544291837968414') { //erkek
          db.push(`isimler_${solve.id}`, ` \`ム ${isim} • ${yas}\` (erkek)`);
          db.set(`kayıt_${solve.id}`, true)
          db.add(`erkek_${message.author.id}`, 1)
          db.add(`toplam_${message.author.id}`, 1)
          await message.guild.members.cache.get(solve.id).roles.remove(Config.Unregister)
          await message.guild.members.cache.get(solve.id).roles.add(
            Config.ManRoles)
          msg.edit(editmsg)
      }
      if (reaction.emoji.id == '832544293611634689') { //kız
          db.push(`isimler_${solve.id}`, ` \`ム ${isim} • ${yas}\` (kız)`);
          db.set(`kayıt_${solve.id}`, true)
          db.add(`kız_${message.author.id}`, 1) // Kafanız karışmaması için 2 sefer kayıt ettiriyorum
          db.add(`toplam_${message.author.id}`, 1)
          await message.guild.members.cache.get(solve.id).roles.remove(Config.Unregister)
          await message.guild.members.cache.get(solve.id).roles.add(Config.WomanRoles)
          return msg.edit(editmsgk)
      }
    
    
  
})}
}
