const {Discord, MessageEmbed} = require("discord.js"); //tanımlamalar
const db = require("quick.db")
const Config = require("../Config.json")
      
module.exports = {
  conf: {
    aliases: ["söyle"],
    name: "say",
    help: "",
  }, 
  run: async (client, message, args, embed) => {

    const yetki = Config.penals.ban.staff
    
    var hata = new MessageEmbed()
   .setColor('000000')
   .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
   .setDescription(`**Bu komutu kullanmaya hakkınız yoktur!**`)
   .setFooter(`Solve?`)

  if (!message.member.roles.cache.has("697084010383278121") && !message.member.hasPermission("MANAGE_MESSAGES") ) 

  return message.channel.send(hata).then(m =>m.delete({timeout:10000}))
   const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
   let count = 0;
   for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
 var msg = message;
 var üyesayısı = msg.guild.memberCount.toString().replace(/ /g, "    ")
   var üs = üyesayısı.match(/([0-9])/g)
 üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
 if(üs) {
   üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
     return {
 '0': `<a:0a:833325275420295188>`,
   '1': `<a:1a:833324569699942450>`,
   '2': `<a:2a:833324668470558721>`,
   '3': `<a:3_a:833324719339339826>`,
   '4': `<a:4a:833324789602975816> `,                       
   '5': `<a:5a:833324853595078666>`,
   '6': `<a:6_a:833324910721105940>`,
   '7': `<a:7_a:833325149218406410>`,
   '8': `<a:8a:833325194713366528>`,
   '9': `<a:9a:833325236858257409>`}[d];
     })
   }/////////////////////////////
 var sessayı = count.toString().replace(/ /g, "    ")
 var üs2 = sessayı.match(/([0-9])/g)
 sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
 if(üs2) {
   sessayı = sessayı.replace(/([0-9])/g, d => {
     return {
'0': `<a:0a:833325275420295188>`,
   '1': `<a:1a:833324569699942450>`,
   '2': `<a:2a:833324668470558721>`,
   '3': `<a:3_a:833324719339339826>`,
   '4': `<a:4a:833324789602975816> `,                       
   '5': `<a:5a:833324853595078666>`,
   '6': `<a:6_a:833324910721105940>`,
   '7': `<a:7_a:833325149218406410>`,
   '8': `<a:8a:833325194713366528>`,
   '9': `<a:9a:833325236858257409>`}[d];
     })
   }

 /////////////////////////////////////////
 var tagdakiler = 0;
 let tag = Config.Tag;
 message.guild.members.cache.forEach(member => {
   if(member.user.username.includes(tag)) {
     tagdakiler = tagdakiler+1
   }  
 })
 var tagdakilerr = tagdakiler.toString().replace(/ /g, "    ")
 var üs3 = tagdakilerr.match(/([0-9])/g)
 tagdakilerr = tagdakilerr.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
 if(üs3) {
   tagdakilerr = tagdakilerr.replace(/([0-9])/g, d => {
     return {
'0': `<a:0a:833325275420295188>`,
   '1': `<a:1a:833324569699942450>`,
   '2': `<a:2a:833324668470558721>`,
   '3': `<a:3_a:833324719339339826>`,
   '4': `<a:4a:833324789602975816> `,                       
   '5': `<a:5a:833324853595078666>`,
   '6': `<a:6_a:833324910721105940>`,
   '7': `<a:7_a:833325149218406410>`,
   '8': `<a:8a:833325194713366528>`,
   '9': `<a:9a:833325236858257409>`}[d];
     })
   }
 //////////////////////////////////////////
 var onlayn = message.guild.members.cache.filter(m => m.user.presence.status === "offline").size.toString().replace(/ /g, "    ")
 var üs4= onlayn.match(/([0-9])/g)
 onlayn = onlayn.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
 if(üs4) {
   onlayn = onlayn.replace(/([0-9])/g, d => {
     return {
'0': `<a:0a:833325275420295188>`,
   '1': `<a:1a:833324569699942450>`,
   '2': `<a:2a:833324668470558721>`,
   '3': `<a:3_a:833324719339339826>`,
   '4': `<a:4a:833324789602975816> `,                       
   '5': `<a:5a:833324853595078666>`,
   '6': `<a:6_a:833324910721105940>`,
   '7': `<a:7_a:833325149218406410>`,
   '8': `<a:8a:833325194713366528>`,
   '9': `<a:9a:833325236858257409>`}[d];
     })
   }


const emoji1 = client.emojis.cache.get("835205217800814674");

var embed1 = new MessageEmbed()
.setColor('000000')
.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
.setDescription(`${emoji1} **Sunucumuzda Toplam ** ${üyesayısı} **Üye bulunmakta.** \n\n ${emoji1} **Sunucumuzda Toplam** ${onlayn} **Çevrimiçi üye bulunmakta.** \n\n ${emoji1} **Ses kanallarında Toplam** ${sessayı} **Üye bulunmakta.** \n\n ${emoji1} **Tagımızda Toplam ** ${tagdakilerr} **Kişi bulunmakta.**`)
.setFooter(`Komutu Kullanan Yetkili: ${message.author.username}`)

 msg.channel.send(embed1);
 
 /*client.setInterval(() => {
 let channel = client.channels.get("694870726280347668"); 
 channel.setTopic(`Toplam üye: _${üyesayısı.toString()}_ / Çevrimiçi üye: ${onlayn}`); //kanal açıklama oto
}, 10000);*/
} 
}