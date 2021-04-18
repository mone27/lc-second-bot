const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config-secrets.json');
const Canvas = require("canvas");


client.on('message', async (message) => {
    if (message.content.match(/!second/ig) && !message.author.bot){

        const args = message.content.match(/!second\s*(.*)\s*\((.*)\)/i);
        const valid = args && args.length === 3
         if (!valid){
             send_help_message(message)
             return
         }

        const [_, lc_name, lc_country] = args
        const voting_card = await get_voting_card(lc_name, lc_country)

        const attachment = new Discord.MessageAttachment(voting_card, 'lc-second.jpg');

        message.channel.send(`*"I, <@${message.author.id}> from ${lc_name} (${lc_country}), second it!"*`, attachment);
    }
});


async function get_voting_card(lc_name, lc_country){
    Canvas.registerFont("Caveat-VariableFont_wght.ttf", {family: "Caveat"})
    // Properly load image
    const canvas = Canvas.createCanvas(710, 1080);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('./second_it_template.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    // set up style
    ctx.font = '60px Caveat';
    ctx.fillStyle = '#00000';
    ctx.textAlign = "center";

    ctx.fillText(lc_country, canvas.width/2, 740);
    ctx.fillText(lc_name, canvas.width/2, 660);



    return canvas.toBuffer("image/jpeg")
}

function send_help_message(message) {
    message.reply(" To second as LC you need to use **!second** `lc_name` (`country`)." +
        "The country name must be in brackets `()`")
}

// Run the bot
client.login(config.token)
    .catch(console.error);


