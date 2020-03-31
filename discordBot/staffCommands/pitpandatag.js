const Command = require('../Command');
const getDoc = require('../../apiTools/playerDocRequest');

const command = async (msg,rest) => {
    if(!rest[0]) msg.reply('please include the username or uuid of the player you would like to edit');
    if(rest[1]==='remove') {
        let doc = await getDoc(rest[0]);
        doc.profileDisplay = undefined;
        doc.save();
        return msg.reply(`Deleted https://pitpanda.rocks/players/${doc._id}`);
    }
    let profileDisplay;
    let jsonString = msg.content.substring(msg.content.indexOf("```json\n")+8,msg.content.lastIndexOf("```"));
    try{
        profileDisplay=JSON.parse(jsonString);
    }catch(e){
        return msg.reply(`Uhoh failed to understand your JSON input error:\n${e}`);
    }
    let doc = await getDoc(rest[0]);
    doc.profileDisplay = profileDisplay;
    doc.save();
    msg.reply(`Added https://pitpanda.rocks/players/${doc._id}`);
}

module.exports = new Command(
    {
        name: 'pitpandatag',
        fn: command,
        description:`Set a player's profile display on pit panda`,
        example:`**$pitpandatag [username|uuid] \\\`\\\`\\\`json [info] \\\`\\\`\\\`**`,
        permlevel:8
    }
);