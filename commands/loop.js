const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "loop 🔁",
  aliases: ['l'],
  description: "```Memutar ulang lagu```",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Ga ada yang di mainkan.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Loop Mode${queue.loop ? "**Di nyalakan**" : "**Di matikan**"}`)
      .catch(console.error);
  }
};
