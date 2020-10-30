const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "pause ⏸️",
  description: "```Menghentikan lagu dengan sementara```",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Ga ada lagu yang dimainkan").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ Menghentikan Lagu.`).catch(console.error);
    }
  }
};
